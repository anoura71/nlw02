import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f0f0f7',
  },

  // [ANT] Minha estilização
  filterButton: {
    flexDirection: 'row',
  },

  // [ANT] Minha estilização
  filterIcon: {
    color: '#fff',
    fontSize: 20,
  },

  // [ANT] Minha estilização
  filterButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
    marginRight: 5,
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 24,
    // marginTop: -35, // [ANT] Aproximar do título
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular',
  },

  input: {
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
    // marginBottom: 4,  // [ANT] Aproximar as caixas de texto (diminuir a altura total do form)
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputBlock: {
    width: '48%',
  },

  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },

  submitButtonText: {
    color: '#fff',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },

  // [ANT] Minha estilização
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // [ANT] Minha estilização
  message: {
    fontFamily: 'Archivo_700Bold',
    color: '#8257e5',
    fontSize: 20,
    lineHeight: 28,
    marginVertical: 40,
    textAlign: 'center',
  }

});


export default styles;
