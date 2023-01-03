<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { goto } from '$app/navigation';
	import type { UserDefinition } from '$types';
	import BasicModal from '$components/BasicModal.svelte';
	import { session } from '$stores/session';
	import type { Writable } from 'svelte/store';
	import type { AuthorizerState } from '@authorizerdev/authorizer-svelte/types';
	import { getContext } from 'svelte';
	import { changeRoute } from '$utils';

	const store: Writable<AuthorizerState> = getContext('authorizerContext');

	let nicknameEditable: boolean = false;
	let newNickname: string = '';

	let eMailEditable: boolean = false;
	let newEMail: string = '';
	let currentEMail: string = 'kala@gmail.com';

	let userPassword: string = 'Yacoid123!'; /*user.password*/
	let currentPassword: string = '';
	let newPassword: string = '';
	let newPasswordConfirmed: string = '';
	let passwordFocused: boolean = false;
	let lengthCriteriaMet: boolean = false;
	let uppercaseCriteriaMet: boolean = false;
	let lowercaseCriteriaMet: boolean = false;
	let digitCriteriaMet: boolean = false;
	let specialCharCriteriaMet: boolean = false;
	let allPasswordCriteriaMet: boolean = false;
	let showPassword: boolean = false;

	let submittedDefinitions: UserDefinition[] = [
		{
			id: '1',
			category: 'human_intelligence',
			content:
				'Artificial Intelligence is a subfield of computer science dealing with topics like Machine Learning.',
			source: {
				id: '1',
				authors: [
					{
						id: '1',
						firstName: 'Bertrand',
						lastName: 'Dieter',
						type: 'person',
						slugId: 'bertrand-dieter-1',
						submittedBy: 'Dr. Bert',
						submittedDate: new Date('2023-01-01')
					}
				],
				type: 'book',
				submittedBy: 'Dr. Bert',
				submittedDate: new Date('2023-01-01'),
				publishingDate: new Date('2021-12-10')
			},
			submittedBy: 'Dr. Bert',
			submittedDate: new Date('2022-11-21'),
			rejectionLog: []
		},
		{
			id: '2',
			category: 'artificial_intelligence',
			content:
				'Artificial Intelligence is a subfield of computer science dealing with topics like Machine Learning.',
			source: {
				id: '2',
				authors: [
					{
						id: '1',
						firstName: 'Bertrand',
						lastName: 'Dieter',
						type: 'person',
						slugId: 'bertrand-dieter-1',
						submittedBy: 'Dr. Bert',
						submittedDate: new Date('2023-01-01')
					}
				],
				type: 'web',
				submittedBy: 'Dr. Bert',
				submittedDate: new Date('2023-01-01'),
				publishingDate: new Date('2021-12-10')
			},
			submittedBy: 'Dr. Bert',
			submittedDate: new Date('2022-11-21'),
			rejectionLog: []
		}
	];

	function changeNickname() {
		if ($session === undefined) {
			console.log('Session is undefined.');
			return;
		}
		console.log($session.id_token);
		let headers: HeadersInit = {
			Authorization: `Bearer ${$session.id_token}`,
			'Content-Type': 'application/json'
		};

		$store.authorizerRef.updateProfile(
			{
				nickname: newNickname
			},
			headers
		);
	}

	function checkAndSetMail() {
		let regex = new RegExp(
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		if (regex.test(newEMail)) {
			currentEMail = newEMail;
			console.log(currentEMail);
		} else {
			newEMail = '';
			alert('Invalid EMail adress.');
		}
	}

	function setNewPassword() {
		if (currentPassword === userPassword) {
			if (allPasswordCriteriaMet) {
				if (newPassword === newPasswordConfirmed) {
					userPassword = newPassword;
					currentPassword = '';
					newPassword = '';
					newPasswordConfirmed = '';
					console.log(userPassword);
					goto('/profiles/private');
				} else {
					alert('New password and confirmed password are not the same!');
				}
			} else {
				alert('New password doesn´t meet all necessary criteria!');
			}
		} else {
			alert('Current password is wrong!');
		}
	}

	function setPasswordFocused() {
		passwordFocused = !passwordFocused;
	}

	function setShowPassword() {
		showPassword = !showPassword;
	}

	function checkPassword() {
		let lengthCriteriaRegex = new RegExp('(?=.{8,})');
		let uppercaseCriteriaRegex = new RegExp('(?=.*[A-Z])');
		let lowercaseCriteriaRegex = new RegExp('(?=.*[a-z])');
		let digitCriteriaRegex = new RegExp('(?=.*[0-9])');
		let specialCharCriteriaRegex = new RegExp('([^A-Za-z0-9])');

		if (lengthCriteriaRegex.test(newPassword)) {
			lengthCriteriaMet = true;
		} else {
			lengthCriteriaMet = false;
		}

		if (uppercaseCriteriaRegex.test(newPassword)) {
			uppercaseCriteriaMet = true;
		} else {
			uppercaseCriteriaMet = false;
		}

		if (lowercaseCriteriaRegex.test(newPassword)) {
			lowercaseCriteriaMet = true;
		} else {
			lowercaseCriteriaMet = false;
		}

		if (digitCriteriaRegex.test(newPassword)) {
			digitCriteriaMet = true;
		} else {
			digitCriteriaMet = false;
		}

		if (specialCharCriteriaRegex.test(newPassword)) {
			specialCharCriteriaMet = true;
		} else {
			specialCharCriteriaMet = false;
		}
		allPasswordCriteriaMet =
			lengthCriteriaMet &&
			uppercaseCriteriaMet &&
			lowercaseCriteriaMet &&
			digitCriteriaMet &&
			specialCharCriteriaMet;
	}

	function deleteAccount() {
		alert('Account deleted');
	}
</script>

<main class="flex justify-center items-center">
	{#if $session === undefined}
		<div class="flex flex-col h-full justify-center items-center p-4 gap-4">
			<p class="text-2xl md:text-3xl font-bold">Login required</p>
			<p class="text-lg md:text-xl">Please click the link below to visit the login page.</p>
			<button class="btn btn-link text-blue-500" on:click={() => changeRoute(goto, 'auth')}
				>Login</button
			>
		</div>
	{:else}
		<div class="flex flex-col gap-12 p-6 lg:p-10 md:m-10 lg:m-14 w-full lg:w-4/5 h-full">
			<div class="flex gap-4">
				{#if nicknameEditable}
					<h1 class="text-lg md:text-xl lg:text-2xl font-bold">
						Hey <input bind:value={newNickname} class="w-fit" />!
					</h1>
					<button
						on:click={() => {
							changeNickname();
							nicknameEditable = !nicknameEditable;
						}}><Icon icon="save" color="#000000" strokeWidth="1.5" /></button
					>
					<button
						on:click={() => {
							nicknameEditable = !nicknameEditable;
						}}><Icon icon="x" color="#000000" strokeWidth="1.5" /></button
					>
				{:else}
					<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
						Hey {$store.user?.nickname}!
					</h1>
					<button
						on:click={() => {
							nicknameEditable = !nicknameEditable;
						}}><Icon icon="edit" color="#000000" strokeWidth="1.5" /></button
					>
				{/if}
			</div>
			<div class="flex flex-col gap-12">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-8 items-center">
					<!-- E-Mail -->
					<h1 class="text-lg md:text-xl lg:text-2xl font-bold">E-Mail</h1>
					<div class="flex gap-3">
						{#if eMailEditable}
							<input
								bind:value={newEMail}
								class="text-lg md:text-xl min-w-fit max-w-1/2 h-12 border-2 border-secondary p-2 rounded-lg"
								placeholder="Enter new E-Mail..."
							/>
							<button
								on:click={() => {
									eMailEditable = false;
									checkAndSetMail();
								}}><Icon icon="save" color="#000000" strokeWidth="1.5" /></button
							>
							<button
								on:click={() => {
									eMailEditable = !eMailEditable;
								}}><Icon icon="x" color="#000000" strokeWidth="1.5" /></button
							>
						{:else}
							<div class="flex gap-3">
								<div>
									<h1 class="text-lg md:text-xl bg-secondary p-3 rounded-xl text-white">
										{currentEMail}
									</h1>
								</div>
								<button
									on:click={() => {
										eMailEditable = !eMailEditable;
									}}><Icon icon="edit" color="#000000" strokeWidth="1.5" /></button
								>
							</div>
						{/if}
					</div>
					<!-- E-Mail -->
				</div>
				<div class="flex flex-col w-full gap-4">
					<h1 class="text-2xl lg:text-3xl font-bold">Account settings</h1>
					<div class="flex flex-col w-full gap-12">
						<div class="flex flex-col rounded-xl shadow-md">
							<div class="w-full bg-secondary p-4 rounded-t-xl">
								<h1 class="text-xl lg:text-2xl font-semibold text-white">Change password</h1>
							</div>
							<div class="flex flex-col p-4 gap-2">
								<div class="flex flex-col w-full gap-2">
									<p class="text-lg lg:text-xl">Current password</p>
									<input
										type="password"
										bind:value={currentPassword}
										class="text-lg md:text-xl w-full md:w-2/3 h-10 border-2 border-secondary p-2 rounded-lg"
									/>
								</div>
								<div class="flex flex-col w-full gap-2">
									<p class="text-lg lg:text-xl">New password</p>
									<div class="w-full md:w-2/3 relative">
										{#if showPassword}
											<input
												type="text"
												bind:value={newPassword}
												on:focusin={setPasswordFocused}
												on:focusout={setPasswordFocused}
												on:input={checkPassword}
												class="text-lg md:text-xl w-full h-10 border-2 border-secondary p-2 rounded-lg"
											/>
										{:else}
											<input
												type="password"
												bind:value={newPassword}
												on:focusin={setPasswordFocused}
												on:focusout={setPasswordFocused}
												on:input={checkPassword}
												class="text-lg md:text-xl w-full h-10 border-2 border-secondary p-2 rounded-lg"
											/>
										{/if}
										<div class="flex absolute top-2 right-3">
											<button on:click={setShowPassword}>
												{#if showPassword}
													<Icon icon="eye-off" color="#00000" strokeWidth="1" />
												{:else}
													<Icon icon="eye" color="#00000" strokeWidth="1" />
												{/if}
											</button>
										</div>
									</div>
									{#if passwordFocused}
										<div class="flex flex-col gap-2">
											<p class="text-base lg:text-lg font-bold">Criteria:</p>
											<ul class="list-inside ml-2">
												<li>
													<div class="flex gap-1">
														{#if lengthCriteriaMet}
															<p class="text-green-600">✔️ min. 8 characters long</p>
														{:else}
															<p class="text-red-600">❌ min. 8 characters long</p>
														{/if}
													</div>
												</li>
												<li>
													<div class="flex gap-1">
														{#if uppercaseCriteriaMet}
															<p class="text-green-600">✔️ min. one uppercase letter (A-Z)</p>
														{:else}
															<p class="text-red-600">❌ min. one uppercase letter (A-Z)</p>
														{/if}
													</div>
												</li>
												<li>
													<div class="flex gap-1">
														{#if lowercaseCriteriaMet}
															<p class="text-green-600">✔️ min. one lowercase letter (a-z)</p>
														{:else}
															<p class="text-red-600">❌ min. one lowercase letter (a-z)</p>
														{/if}
													</div>
												</li>
												<li>
													<div class="flex gap-1">
														{#if digitCriteriaMet}
															<p class="text-green-600">✔️ min. one digit (0-9)</p>
														{:else}
															<p class="text-red-600">❌ min. one digit (0-9)</p>
														{/if}
													</div>
												</li>
												<li>
													<div class="flex gap-1">
														{#if specialCharCriteriaMet}
															<p class="text-green-600">
																✔️ min. one special character (!, #, ...)
															</p>
														{:else}
															<p class="text-red-600">❌ min. one special character (!, #, ...)</p>
														{/if}
													</div>
												</li>
											</ul>
										</div>
									{/if}
								</div>
								<div class="flex flex-col w-full gap-2">
									<p class="text-lg lg:text-xl">Confirm new password</p>
									{#if showPassword}
										<input
											type="text"
											bind:value={newPasswordConfirmed}
											class="text-lg md:text-xl w-full md:w-2/3 h-10 border-2 border-secondary p-2 rounded-lg"
										/>
									{:else}
										<input
											type="password"
											bind:value={newPasswordConfirmed}
											class="text-lg md:text-xl w-full md:w-2/3 h-10 border-2 border-secondary p-2 rounded-lg"
										/>
									{/if}
								</div>
								{#if currentPassword === '' || newPassword === '' || newPasswordConfirmed === ''}
									<button class="btn btn-primary btn-disabled place-self-end"
										>Change password
									</button>
								{:else}
									<!-- The button to open modal -->
									<label for="passwordModal" class="btn btn-primary modal-button place-self-end"
										>Change password
									</label>

									<BasicModal
										modalName="passwordModal"
										modalTitle="Change password"
										modalContent="Do you really want to change your password? This step can not be undone."
										callbackFunction={setNewPassword}
									/>
								{/if}
							</div>
						</div>
						<div class="flex flex-col rounded-xl shadow-md">
							<div class="w-full bg-secondary p-4 rounded-t-xl">
								<h1 class="text-xl lg:text-2xl font-semibold text-white">Delete account</h1>
							</div>
							<div class="flex flex-col p-4 gap-6">
								<div class="flex flex-col gap-2">
									<h1 class="text-lg lg:text-xl font-medium">
										What happens when you delete your account?
									</h1>
									<p class="text-base lg:text-lg">
										When you delete your account YACOID will delete all of your stored data and
										permanently close it. Once deleted, your account can't be restored.
									</p>
								</div>
								<!-- The button to open modal -->
								<label for="deleteAccountModal" class="btn btn-primary modal-button place-self-end"
									>Request account deletion
								</label>

								<BasicModal
									modalName="deleteAccountModal"
									modalTitle="Delete account"
									modalContent="Do you really want to delete your account? This step can not be undone."
									callbackFunction={deleteAccount}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col rounded-xl shadow-md">
				<div class="w-full bg-secondary p-4 rounded-t-xl">
					<h1 class="text-xl lg:text-2xl font-semibold text-white">Submitted Definitions</h1>
				</div>
				<div class="flex flex-col gap-4 p-4">
					<p class="text-lg lg:text-xl">
						Review all of your submitted definitions and their status.
						<span class="font-medium">(click row for details)</span>
					</p>
					<div class="overflow-x-auto">
						<table class="table w-full">
							<!-- head -->
							<thead>
								<tr>
									<th />
									<th>Definition</th>
									<th>Submitted On</th>
									<th>Submission Status</th>
								</tr>
							</thead>
							<tbody>
								{#each submittedDefinitions as submittedDefinition}
									<tr
										class="hover:active cursor-pointer"
										on:click={() => alert('Now the modal should open to see details')}
									>
										<th>{submittedDefinitions.indexOf(submittedDefinition) + 1}</th>
										<td
											><p>
												{submittedDefinition.content.substring(0, 50)}
												{submittedDefinition.content.length >= 50 ? '...' : ''}
											</p></td
										>
										<td>{submittedDefinition.submittedDate.toLocaleDateString()}</td>
										<td>
											<!-- <p
												class={`${
													submittedDefinition.status?.status === 'approved' && 'text-success'
												} ${submittedDefinition.status?.status === 'pending' && 'text-warning'} ${
													submittedDefinition.status?.status === 'declined' && 'text-error'
												}`}
											>
												{submittedDefinition.status?.status}
											</p> -->
											Status
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<style lang="postcss">
</style>
