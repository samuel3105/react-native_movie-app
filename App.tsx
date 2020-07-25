import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from './components/Header';

const { width, height } = Dimensions.get('window');

const arrayFetch = [
	{
		id: 0,
		name: 'In Theater',
		url:
			'https://api.themoviedb.org/3/movie/now_playing?api_key=c059bd0849de3441fe8eaa21f8db479f&language=fr&page=1',
	},
	{
		id: 1,
		name: 'Box Office',
		url: 'https://api.themoviedb.org/3/movie/popular?api_key=c059bd0849de3441fe8eaa21f8db479f&language=fr&page=1',
	},
	{
		id: 2,
		name: 'Coming Soon',
		url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=c059bd0849de3441fe8eaa21f8db479f&language=fr&page=1',
	},
];

export default function App() {
	const [selected, setSelected] = useState(0);

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		changingPage(0);
	}, []);

	const changingPage = (nb: number) => {
		setSelected(nb);
		fetch(arrayFetch[nb].url)
			.then((response) => response.json())
			.then((responseJson) => {
				setMovies(responseJson.results);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Header></Header>
				<View style={styles.pager}>
					<ScrollView
						horizontal
						decelerationRate="fast"
						bounces={true}
						showsHorizontalScrollIndicator={false}
					>
						<TouchableOpacity activeOpacity={1} onPress={() => changingPage(0)}>
							<Text style={[styles.label, selected == 0 ? styles.select : null]}>In Theater</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={1} onPress={() => changingPage(1)}>
							<Text style={[styles.label, selected == 1 ? styles.select : null]}>Box Office</Text>
						</TouchableOpacity>
						<TouchableOpacity activeOpacity={1} onPress={() => changingPage(2)}>
							<Text style={[styles.label, selected == 2 ? styles.select : null, { marginRight: 32 }]}>
								Coming Soon
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
				<StatusBar style="auto" />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	pager: {
		marginTop: 48,
	},
	label: {
		marginLeft: 32,
		fontSize: 32,
		color: '#B9B9C5',
	},
	select: {
		color: '#12153D',
	},
});
