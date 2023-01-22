<script lang="ts">
	import Icon from '$components/Icon.svelte';
	import { goto } from '$app/navigation';
	import { Genders, type Definition, type Gender } from '$types';
	import BasicModal from '$components/BasicModal.svelte';
	import SubmitDetail from '$components/SubmitDetail.svelte';

	let currentNickname: string = 'alecpope';
	let nicknameEditable: boolean = false;
	let newNickname: string = '';

	let currentFirstName: string = 'Alec';
	let firstNameEditable: boolean = false;
	let newFirstName: string = '';

	let currentLastName: string = 'Pope';
	let lastNameEditable: boolean = false;
	let newLastName: string = '';

	let currentGender: Gender = 'male';
	let genderEditable: boolean = false;
	let newGender: Gender = 'diverse';

	let currentBirthdate: Date = new Date('2001-01-15');
	let birthdateEditable: boolean = false;
	let newBirthdate: Date | null = new Date();

	let eMailEditable: boolean = false;
	let newEMail: string = '';
	let currentEMail: string = 'kala@gmail.com';

	let addressEditable: boolean = false;
	let newStreet: string = '';
	let newStreetNumber: string = '';
	let newPostcode: string = '';
	let newCity: string = '';
	let newAddress: string = '';
	let currentStreet: string = 'Bertstraße';
	let currentStreetNumber: string = '113';
	let currentPostcode: string = '19241';
	let currentCity: string = 'Berttown';
	let currentAddress: string =
		currentStreet + ' ' + currentStreetNumber + ', ' + currentPostcode + ' ' + currentCity;

	let userPassword: string = 'Kinker123!'; /*user.password*/
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

	let submittedDefinitions: Definition[] = [
		{
			id: 8,
			category: 'human_intelligence',
			author: 'Winston, P.H.',
			publishingDate: new Date(1996),
			content:
				'Human Intelligence is a subfield of intelligence that deals with understanding how human think.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1996.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21'),
			status: {
				status: 'declined',
				declinementMessage: "The source doesn't seem to be valid, please update it."
			}
		},
		{
			id: 7,
			category: 'human_intelligence',
			author: 'Quinston, Elizabeth',
			publishingDate: new Date(1996),
			content:
				'Artificial Intelligence is a subfield of computer science dealing with topics like Machine Learning.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1991.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-21'),
			status: {
				status: 'approved'
			}
		},
		{
			id: 9,
			category: 'artificial_intelligence',
			author: 'George, Fred',
			publishingDate: new Date(1996),
			content: 'This is a test definition.',
			source: 'Artificial Intelligence. Third Edition, Addison-Wesley Publishing Company, 1994.',
			submittedBy: 'Dr. Bert',
			submittedOn: new Date('2022-11-20'),
			status: {
				status: 'pending'
			}
		}
	];

	function changeNickname() {
		// if (user) {
		// 	nicknameEditable = false;
		// 	try {
		// 		changeUserData($accessToken, {
		// 			nickname: newNickname
		// 		});
		// 		user.nickname = newNickname;
		// 		user = user;
		// 	} catch (error) {
		// 		alert(error);
		// 	}
		// }
	}

	function changeFirstName() {
		// if (user) {
		// 	firstNameEditable = false;
		// 	try {
		// 		changeUserData($accessToken, {
		// 			firstName: newFirstName
		// 		});
		// 		user.name = newFirstName;
		// 		user = user;
		// 	} catch (error) {
		// 		alert(error);
		// 	}
		// }
	}

	function changeLastName() {
		// if (user) {
		// 	lastNameEditable = false;
		// 	try {
		// 		changeUserData($accessToken, {
		// 			lastName: newLastName
		// 		});
		// 		user.family_name = newLastName;
		// 		user = user;
		// 	} catch (error) {
		// 		alert(error);
		// 	}
		// }
	}

	function changeGender() {
		// if (user) {
		// 	genderEditable = false;
		// 	try {
		// 		changeUserData($accessToken, {
		// 			gender: newGender
		// 		});
		// 		$customClaims.gender = newGender;
		// 		customClaims.set($customClaims);
		// 		console.log($customClaims.gender);
		// 	} catch (error) {
		// 		alert(error);
		// 	}
		// }
	}

	function changeBirthdate() {
		// if (user && newBirthdate) {
		// 	genderEditable = false;
		// 	try {
		// 		changeUserData($accessToken, {
		// 			birthdate: newBirthdate
		// 		});
		// 		$customClaims.birthdate = newBirthdate;
		// 		customClaims.set($customClaims);
		// 	} catch (error) {
		// 		alert(error);
		// 	}
		// }

		$: {
			newAddress = newStreet + ' ' + newStreetNumber + ', ' + newPostcode + ' ' + newCity;
		}

		$: {
			if (!newBirthdate) newBirthdate = new Date();
		}
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

	function setAndCheckAdress() {
		// you have to check postcode and newStreetNumber (19 or 19a, not a19)
		let regex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
		if (regex.test(newPostcode)) {
			currentStreet = newStreet;
			currentStreetNumber = newStreetNumber;
			currentPostcode = newPostcode;
			currentCity = newCity;
			currentAddress = newAddress;
		} else {
			alert('invalid postcode');
		}
		newStreet = '';
		newStreetNumber = '';
		newPostcode = '';
		newCity = '';
		newAddress = '';
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
	<div class="flex flex-col gap-12 p-6 lg:p-10 md:m-10 lg:m-14 w-full lg:w-4/5 h-full">
		<div class="flex gap-4">
			{#if nicknameEditable}
				<h1 class="text-lg md:text-xl lg:text-2xl font-bold">
					Hey <input bind:value={newNickname} class="w-fit" />!
				</h1>
				<button on:click={changeNickname}
					><Icon icon="save" color="#000000" strokeWidth="1.5" /></button
				>
				<button
					on:click={() => {
						nicknameEditable = !nicknameEditable;
					}}><Icon icon="x" color="#000000" strokeWidth="1.5" /></button
				>
			{:else}
				<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
					Hey {currentNickname}!
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
				<!-- First Name -->
				<h1 class="text-lg md:text-xl lg:text-2xl font-bold">First name</h1>
				<div class="flex gap-3">
					{#if firstNameEditable}
						<input
							bind:value={newFirstName}
							class="text-lg md:text-xl min-w-fit max-w-1/2 h-12 border-2 border-secondary p-2 rounded-lg"
							placeholder="Enter new first name..."
						/>
						<button on:click={changeFirstName}
							><Icon icon="save" color="#000000" strokeWidth="1.5" /></button
						>
						<button
							on:click={() => {
								firstNameEditable = !firstNameEditable;
							}}><Icon icon="x" color="#000000" strokeWidth="1.5" /></button
						>
					{:else}
						<h1 class="text-lg md:text-xl bg-secondary p-3 rounded-xl text-white">
							{currentFirstName}
						</h1>
						<button
							on:click={() => {
								firstNameEditable = !firstNameEditable;
							}}><Icon icon="edit" color="#000000" strokeWidth="1.5" /></button
						>
					{/if}
				</div>
				<!-- First Name -->

				<!-- Last Name -->
				<h1 class="text-lg md:text-xl lg:text-2xl font-bold">Last name</h1>
				<div class="flex gap-3">
					{#if lastNameEditable}
						<input
							bind:value={newLastName}
							class="text-lg md:text-xl min-w-fit max-w-1/2 h-12 border-2 border-secondary p-2 rounded-lg"
							placeholder="Enter new last name..."
						/>
						<button on:click={changeLastName}
							><Icon icon="save" color="#000000" strokeWidth="1.5" /></button
						>
						<button
							on:click={() => {
								lastNameEditable = !lastNameEditable;
							}}><Icon icon="x" color="#000000" strokeWidth="1.5" /></button
						>
					{:else}
						<h1 class="text-lg md:text-xl bg-secondary p-3 rounded-xl text-white">
							{currentLastName}
						</h1>
						<button
							on:click={() => {
								lastNameEditable = !lastNameEditable;
							}}><Icon icon="edit" color="#000000" strokeWidth="1.5" /></button
						>
					{/if}
				</div>
				<!-- Last Name -->

				<!-- Gender -->
				<h1 class="text-lg md:text-xl lg:text-2xl font-bold">Gender</h1>
				<div class="flex gap-6">
					<div class="flex flex-col sm:flex-row gap-4">
						{#each Genders as gender}
							<div class="flex gap-2">
								<p class="text-lg md:text-xl">{gender}</p>
								<input
									type="radio"
									name="radio-1"
									class="radio"
									value={gender}
									bind:group={newGender}
									disabled={!genderEditable}
								/>
							</div>
						{/each}

						{#if genderEditable}
							<div class="flex gap-2">
								<button on:click={changeGender}
									><Icon icon="save" color="#000000" strokeWidth="1.5" /></button
								>
								<button
									on:click={() => {
										genderEditable = !genderEditable;
									}}><Icon icon="x" color="#000000" strokeWidth="1.5" /></button
								>
							</div>
						{:else}
							<button
								on:click={() => {
									genderEditable = !genderEditable;
								}}><Icon icon="edit" color="#000000" strokeWidth="1.5" /></button
							>
						{/if}
					</div>
				</div>
				<!-- Gender -->

				<!-- Birthdate -->
				<h1 class="text-lg md:text-xl lg:text-2xl font-bold">Date of birth</h1>
				<div class="flex gap-3">
					{#if birthdateEditable}
						<input type="date" bind:value={newBirthdate} class="min-w-fit max-w-1/2 h-12" />
						<button on:click={changeBirthdate}
							><Icon icon="save" color="#000000" strokeWidth="1.5" /></button
						>
						<button
							on:click={() => {
								birthdateEditable = !birthdateEditable;
							}}><Icon icon="x" color="#000000" strokeWidth="1.5" /></button
						>
					{:else}
						<h1 class="text-lg md:text-xl bg-secondary p-3 rounded-xl text-white">
							{#if newBirthdate}
								{newBirthdate.toLocaleDateString()}
							{:else}
								{new Date().toLocaleDateString()}
							{/if}
						</h1>
						<button
							on:click={() => {
								birthdateEditable = !birthdateEditable;
							}}><Icon icon="edit" color="#000000" strokeWidth="1.5" /></button
						>
					{/if}
				</div>
				<!-- Birthdate -->

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

				<!-- Address -->
				<h1 class="text-lg md:text-xl lg:text-2xl font-bold">Address</h1>
				<div class="flex gap-3">
					{#if addressEditable}
						<div class="flex flex-col gap-2">
							<div class="flex gap-2">
								<input
									bind:value={newStreet}
									class="text-lg md:text-xl w-2/3 h-12 border-2 border-secondary p-2 rounded-lg"
									placeholder="Street"
								/>
								<input
									bind:value={newStreetNumber}
									class="text-lg md:text-xl w-1/3 h-12 border-2 border-secondary p-2 rounded-lg"
									placeholder="Number"
								/>
							</div>
							<div class="flex gap-2">
								<input
									bind:value={newPostcode}
									class="text-lg md:text-xl w-1/3 h-12 border-2 border-secondary p-2 rounded-lg"
									placeholder="Postcode"
								/>
								<input
									bind:value={newCity}
									class="text-lg md:text-xl w-2/3 h-12 border-2 border-secondary p-2 rounded-lg"
									placeholder="City"
								/>
								<button
									on:click={() => {
										addressEditable = false;
										setAndCheckAdress();
									}}><Icon icon="save" color="#000000" strokeWidth="1.5" /></button
								>
								<button
									on:click={() => {
										addressEditable = !addressEditable;
									}}><Icon icon="x" color="#000000" strokeWidth="1.5" /></button
								>
							</div>
						</div>
					{:else}
						<h1 class="text-lg md:text-xl bg-secondary p-3 rounded-xl text-white">
							{currentAddress}
						</h1>
						<button
							on:click={() => {
								addressEditable = !addressEditable;
							}}><Icon icon="edit" color="#000000" strokeWidth="1.5" /></button
						>
					{/if}
				</div>
				<!-- Address -->
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
														<p class="text-green-600">✔️ min. one special character (!, #, ...)</p>
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
					<!-- <span class="font-medium">(click row for details)</span> -->
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
								<th class="flex justify-center">Details</th>
							</tr>
						</thead>
						<tbody>
							{#each submittedDefinitions as submittedDefinition}
								<tr
									class="" 

								>
									<th>{submittedDefinitions.indexOf(submittedDefinition) + 1}</th>
									<td
										><p>
											{submittedDefinition.content.substring(0, 50)}
											{submittedDefinition.content.length >= 50 ? '...' : ''}
										</p></td
									>
									<td>{submittedDefinition.submittedOn.toLocaleDateString()}</td>
									<td>
										<p
											class={`${
												submittedDefinition.status?.status === 'approved' && 'text-success'
											} ${submittedDefinition.status?.status === 'pending' && 'text-warning'} ${
												submittedDefinition.status?.status === 'declined' && 'text-error'
											}`}
										>
											{submittedDefinition.status?.status}
										</p>
									</td>
									<td>
										<label for="modal_accept1" class="flex justify-center hover:active cursor-pointer"><Icon icon="arrow-right-circle" color="#000000" strokeWidth="1.5" /></label>
									</td>
								</tr>
								<SubmitDetail
								modalName="modal_accept1"
								modalTitle="Details on your submitted definition"
								submitDate={submittedDefinition.submittedOn.toDateString()}
								submitDef={submittedDefinition.content}
								submitFeedback={submittedDefinition.status?.declinementMessage}
								submitStatus={submittedDefinition.status?.status}
								submitPublishing_date={submittedDefinition.publishingDate.toDateString()}
								submitAuthor={submittedDefinition.author}
								submitSource={submittedDefinition.source}
							/>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</main>



<style lang="postcss">
</style>
