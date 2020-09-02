import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';


function Favourites() {


  const [favourites, setFavourites] = useState([]);


  useFocusEffect(() => {
    loadFavourites();
  });


  function loadFavourites() {

    AsyncStorage.getItem('favourites')
      .then(response => {
        console.log(JSON.stringify(response));
        if (response) {
          const favouritedTeachers = JSON.parse(response);
          setFavourites(favouritedTeachers);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favourites.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favourited
            />
          );
        })}
      </ScrollView>
    </View>
  );


}


export default Favourites;
