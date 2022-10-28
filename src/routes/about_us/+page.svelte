<script lang="ts">
	import Header from '../../components/Header.svelte';
	import Footer from '../../components/Footer.svelte';
</script>

<Header />

<div class="flex flex-col h-full w-full justify-center items-center gap-6">
	<p class="text-3xl md:text-4xl font-bold mt-6">About YACOID!</p>
	<div class="flex flex-col lg:flex-row w-full justify-around items-center gap-6 lg:gap-0">
		<div class="headline  text-2xl md:text-4xl font-bold w-1/3 text-center">Meet the Team</div>
		<div class="flex w-2/3 lg:mx-6">
			<section
				class="p-8 max-w-4xl xl:max-w-6xl 2xl:max-w-7xl text-center bg-base-100 shadow-2xl rounded-xl"
			>
				<div class="grid gap-x-6 lg:gap-x-12 md:grid-cols-4 mt-16">
					<div class="mb-24 md:mb-0">
						<div class="rounded-lg shadow-lg h-full block bg-base-200">
							<div class="flex justify-center">
								<div class="flex justify-center" style="margin-top: -75px">
									<img
										src="/Robert.jfif"
										class="rounded-full mx-auto shadow-lg"
										alt=""
										style="width: 150px"
									/>
								</div>
							</div>
							<div class="p-6">
								<h5 class="text-lg font-bold mb-4">Robert Witzke</h5>
								<p class="mb-6">Frontend Developer</p>
								<ul class="list-inside flex mx-auto justify-center">
									<a href="https://github.com/robertwitzke" class="px-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 496 512"
											class="w-4 h-4 text-blue-600"
										>
											<path
												fill="currentColor"
												d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
											/>
										</svg>
									</a>
									<a href="https://www.linkedin.com/in/robert-witzke-1b1414244" class="px-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
											class="w-4 h-4 text-blue-600"
										>
											<path
												fill="currentColor"
												d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
											/>
										</svg>
									</a>
								</ul>
							</div>
						</div>
					</div>

					<div class="mb-24 md:mb-0">
						<div class="rounded-lg shadow-lg h-full block bg-base-200">
							<div class="flex justify-center">
								<div class="flex justify-center" style="margin-top: -75px">
									<img
										src="/Denis.jpg"
										class="rounded-full mx-auto shadow-lg"
										alt=""
										style="width: 150px"
									/>
								</div>
							</div>
							<div class="p-6">
								<h5 class="text-lg font-bold mb-4">Denis Knecht</h5>
								<p class="mb-6">Backend Developer</p>
								<ul class="list-inside flex mx-auto justify-center">
									<a href="https://github.com/DenisKnecht02" class="px-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 496 512"
											class="w-4 h-4 text-blue-600"
										>
											<path
												fill="currentColor"
												d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
											/>
										</svg>
									</a>
								</ul>
							</div>
						</div>
					</div>

					<div class="mb-24 md:mb-0">
						<div class="rounded-lg shadow-lg h-full block bg-base-200">
							<div class="flex justify-center">
								<div class="flex justify-center" style="margin-top: -75px">
									<img
										src="/Marten.jpg"
										class="rounded-full mx-auto shadow-lg"
										alt=""
										style="width: 150px"
									/>
								</div>
							</div>
							<div class="p-6">
								<h5 class="text-lg font-bold mb-4">Marten Kaffler</h5>
								<p class="mb-6">Frontend Developer</p>
								<ul class="list-inside flex mx-auto justify-center">
									<a href="https://github.com/Marten-Ka" class="px-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 496 512"
											class="w-4 h-4 text-blue-600"
										>
											<path
												fill="currentColor"
												d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
											/>
										</svg>
									</a>
									<a href="https://www.linkedin.com/in/marten-kaffler-33aa85211" class="px-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
											class="w-4 h-4 text-blue-600"
										>
											<path
												fill="currentColor"
												d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
											/>
										</svg>
									</a>
								</ul>
							</div>
						</div>
					</div>

					<div class="">
						<div class="rounded-lg shadow-lg h-full block bg-base-200">
							<div class="flex justify-center">
								<div class="flex justify-center" style="margin-top: -75px">
									<img
										src="/Hamid.jfif"
										class="rounded-full mx-auto shadow-lg"
										alt=""
										style="width: 150px"
									/>
								</div>
							</div>
							<div class="p-6">
								<h5 class="text-lg font-bold mb-4">Hamid Omar</h5>
								<p class="mb-6">Frontend Developer</p>
								<ul class="list-inside flex mx-auto justify-center">
									<a href="https://github.com/hamidomar000m" class="px-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 496 512"
											class="w-4 h-4 text-blue-600"
										>
											<path
												fill="currentColor"
												d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
											/>
										</svg>
									</a>
									<a href="https://www.linkedin.com/in/hamid-omar-229452187" class="px-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 448 512"
											class="w-4 h-4 text-blue-600"
										>
											<path
												fill="currentColor"
												d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
											/>
										</svg>
									</a>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<p class="text-xl text-justify m-8">
					We are a team of four students. At the time of completion of this website
					<span
						class="text-xl font-mono">(February 2023)</span>
					we are completing the fifth semester in the field of computer science in the form of a dual study program at the
					<bold class="font-bold">Berlin School of Economics and Law</bold>.
					Further information on the university can be found 
					<a
						class="link link-secondary" href="https://www.hwr-berlin.de/">here
					</a>
					.
				</p>
			</section>
		</div>
	</div>
	<div class="flex flex-col lg:flex-row w-full justify-around items-center gap-6 lg:gap-0">
		<div class="headline  text-2xl md:text-4xl font-bold w-1/3 text-center">
			YACOID - the Project
		</div>
		<div class="flex w-2/3 lg:m-6">
			<section
				class="p-8 max-w-4xl xl:max-w-6xl 2xl:max-w-7xl text-center bg-base-100 shadow-2xl rounded-xl"
			>
				<p class="text-xl text-justify m-8">
					<bold class="font-bold">YACOID</bold> is an abbreviation for "<bold class="font-bold">Y</bold>et
					<bold class="font-bold">A</bold>nother <bold class="font-bold">C</bold>ollection
					<bold class="font-bold">o</bold>f <bold class="font-bold">I</bold>ntelligent <bold class="font-bold">D</bold>efinitions".
					The project's aim is to provide scientific defintions according to all areas of intelligence.
					Researchers and interested people should easily access a collection of disambiguations.
					It was created as part of a study project at the University of Economics and Law.
				</p>
			</section>
		</div>
	</div>
</div>
<Footer />

<style lang="postcss">
</style>
