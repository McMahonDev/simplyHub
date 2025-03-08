<script>
	import { fetchWeatherApi } from 'openmeteo';

	let weatherData = $state();
	let error = $state('test');

	const url = 'https://api.open-meteo.com/v1/forecast';

	$effect(() => {
		findMyLocation();
	});

	async function findMyLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				async (position) => {
					let params = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						current: ['temperature_2m', 'apparent_temperature'],
						hourly: [
							'temperature_2m',
							'apparent_temperature',
							'precipitation_probability',
							'precipitation',
							'rain',
							'snowfall'
						],
						temperature_unit: 'fahrenheit',
						wind_speed_unit: 'mph',
						precipitation_unit: 'inch',
						timeformat: 'unixtime'
					};

					try {
						const response = await fetchWeatherApi(url, params);
						weatherData = response;
						console.log(response);
					} catch (err) {
						// error = 'Failed to fetch weather data';
						console.error(err);
					}
				},
				(err) => {
					// error = 'Unable to retrieve your location';
					console.error(err);
				}
			);
		} else {
			// error = 'Geolocation is not supported by this browser';
		}
	}
</script>

{#if error}
	<p>{error}</p>
{:else if weatherData}
	<p>Temperature: {weatherData.current.temperature_2m}°F</p>
	<p>Apparent Temperature: {weatherData.current.apparent_temperature}°F</p>
{:else}
	<p>Loading weather data...</p>
{/if}
