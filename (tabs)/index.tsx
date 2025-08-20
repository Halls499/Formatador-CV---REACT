import React, { useState, useRef } from 'react';
import {
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  View,
  Alert,
} from 'react-native';
import { Card } from 'react-native-paper';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export default function HomeScreen() {
  const [nome, setNome] = useState('');
  const [nasceu, setNasceu] = useState('');
  const [endereco, setEndereco] = useState('');
  const [formacaoAcademica, setFormacaoAcademica] = useState('');
  const [experienciaProfissional, setExperienciaProfissional] = useState('');
  const [proeficienciaLinguistica, setProeficienciaLinguistica] = useState('');
  const [curriculoFormatado, setCurriculoFormatado] = useState('');

  const cardRef = useRef<View>(null);

  const handleEnviar = () => {
    console.log('Botão clicado - handleEnviar');

    const texto = `
=============================
         CURRÍCULO
=============================

Nome: ${nome}
Data de Nascimento: ${nasceu}
Endereço: ${endereco}

Formação Acadêmica:
${formacaoAcademica}

Experiência Profissional:
${experienciaProfissional}

Proficiência Linguística:
${proeficienciaLinguistica}

=============================
    `;
    setCurriculoFormatado(texto);
  };

  const compartilharImagem = async () => {
    if (!curriculoFormatado) {
      alert('Por favor, preencha os dados antes de gerar a imagem.');
      return;
    }

    try {
      const uri = await captureRef(cardRef, {
        format: 'png',
        quality: 0.8,
      });

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Erro', 'Compartilhamento não está disponível nesse dispositivo.');
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log('Erro ao capturar imagem:', error);
      alert('Erro ao capturar imagem');
    }
  };

  return (
    <ScrollView style={{ backgroundColor: '#121212' }}>
      <Text style={styles.titulo}>Formatador de Currículo</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="white"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        placeholderTextColor="white"
        value={nasceu}
        onChangeText={setNasceu}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        placeholderTextColor="white"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Formação Acadêmica"
        placeholderTextColor="white"
        value={formacaoAcademica}
        onChangeText={setFormacaoAcademica}
      />
      <TextInput
        style={styles.input}
        placeholder="Experiência Profissional"
        placeholderTextColor="white"
        value={experienciaProfissional}
        onChangeText={setExperienciaProfissional}
      />
      <TextInput
        style={styles.input}
        placeholder="Proficiência Linguística"
        placeholderTextColor="white"
        value={proeficienciaLinguistica}
        onChangeText={setProeficienciaLinguistica}
      />

      <Button title="Enviar informações" onPress={handleEnviar} />

      {curriculoFormatado ? (
        <>
          <Card style={styles.card} ref={cardRef}>
            <Card.Content>
              <Text style={styles.curriculoText}>{curriculoFormatado}</Text>
            </Card.Content>
          </Card>

          <Button title="Compartilhar como imagem" onPress={compartilharImagem} />
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    margin: 24,
    paddingTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    marginHorizontal: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#333',
    color: 'white',
  },
  card: {
    margin: 24,
    padding: 10,
    backgroundColor: '#1e1e1e',
  },
  curriculoText: {
    fontFamily: 'monospace',
    color: 'white',
  },
});
