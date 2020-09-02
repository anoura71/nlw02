import React, { useState, FormEvent, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, Picker } from 'react-native';
// import { Picker } from '@react-native-community/picker'; // TODO tentar usar este (e remover acima, depreciado)
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
// import DateTimePicker from '@react-native-community/datetimepicker'; // TODO testar (não funcionou)

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';


function TeacherList() {


  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [message, setMessage] = useState('');

  const [teachers, setTeachers] = useState([]);
  const [favourites, setFavourites] = useState<number[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');


  function loadFavourites() {

    AsyncStorage.getItem('favourites')
    .then(response => {
      // console.log(JSON.stringify(response));
      if (response) {
        const favouritedTeachers = JSON.parse(response);
        const favouritedTeacherIds = favouritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        })
        setFavourites(favouritedTeachers);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }


  // useEffect(() => {
  //   AsyncStorage.setItem('favourites', JSON.stringify([]));
  // }, []);

  useFocusEffect(()=> {
    loadFavourites();
  })


  function handleToggleFiltersVisible() {

    setIsFiltersVisible(!isFiltersVisible);
  }


  async function handleFiltersSubmit() {

    loadFavourites();

    await api.get('classes', {
      params: {
        subject,
        week_day,
        time,
      }
    })
      .then((response) => {
        if (response.data.length === 0) {
          setTeachers([]);
          setMessage('Nenhum Proffy foi encontrado com os critérios de pesquisa informados.');
        } else {
          setIsFiltersVisible(false);
          setTeachers(response.data);
          setMessage('');
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage('Ocorreu um erro ao buscar os Proffys.');
      });
  }


  // function handleDisplayMessage() {

  //   if (message !== '') {
  //     const messageToShow = message;
  //     setMessage('');
  //     return messageToShow;
  //   }
  // }


  // TODO: testar 
  // const onChangeTime = (event: FormEvent, selectedTime: string) => {
  //   setTime(selectedTime);
  // };


  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton
            style={styles.filterButton} // [ANT] Minha estilização
            onPress={handleToggleFiltersVisible}
          >
            {/* [ANT] Componente inserido por mim, para aumentar a área do botão */}
            <Text style={styles.filterButtonText}>
              {isFiltersVisible ? 'ocultar' : 'mostrar'}
            </Text>

            <Feather
              name="filter"
              style={styles.filterIcon} // [ANT] Minha estilização
            />

            {/* [ANT] Componente inserido por mim, para aumentar a área do botão */}
            <Text style={styles.filterButtonText}>
              {!isFiltersVisible && '...'}
            </Text>
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            {/* <TextInput
              style={styles.input}
              value={subject}
              onChangeText={text => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            /> */}
            <Picker
              style={styles.input}
              selectedValue={subject}
              onValueChange={itemValue => setSubject(itemValue)}
            >
              <Picker.Item
                value=""
                label="Qual a matéria?"
                color="#c1bccc"
              />
              <Picker.Item value="Artes" label="Artes" />
              <Picker.Item value="Biologia" label="Biologia" />
              <Picker.Item value="Ciências" label="Ciências" />
              <Picker.Item value="Educação Física" label="Educação Física" />
              <Picker.Item value="Física" label="Física" />
              <Picker.Item value="Geografia" label="Geografia" />
              <Picker.Item value="História" label="História" />
              <Picker.Item value="Inglês" label="Inglês" />
              <Picker.Item value="Matemática" label="Matemática" />
              <Picker.Item value="Português" label="Português" />
              <Picker.Item value="Química" label="Química" />
            </Picker>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                {/* <TextInput
                  style={styles.input}
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                /> */}
                <Picker
                  style={styles.input}
                  selectedValue={week_day}
                  onValueChange={itemValue => setWeekDay(itemValue)}
                >
                  <Picker.Item
                    value=""
                    label="Qual o dia?"
                    color="#c1bccc"
                  />
                  <Picker.Item value="0" label="Domingo" />
                  <Picker.Item value="1" label="Segunda-feira" />
                  <Picker.Item value="2" label="Terça-feira" />
                  <Picker.Item value="3" label="Quarta-feira" />
                  <Picker.Item value="4" label="Quinta-feira" />
                  <Picker.Item value="5" label="Sexta-feira" />
                  <Picker.Item value="6" label="Sábado" />
                </Picker>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  value={time}
                  onChangeText={text => setTime(text)}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                />
                {/* <DateTimePicker
                  timeZoneOffsetInMinutes={0}
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeTime}
                /> */}
              </View>
            </View>

            <RectButton
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>
                Filtrar
              </Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favourited={favourites.includes(teacher.id)}
            />
          );
        })}

        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {message}
          </Text>
        </View>
      </ScrollView>
    </View>
  );


}


export default TeacherList;
