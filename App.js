import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Audio } from "expo-av";

// Example phrases
const phrases = [
  {
    label: "Intro",
    english:
      "Hello, I am a paramedic. Please come with me so that we can start an IV and collect some blood samples.",
    spanish:
      "Hola, soy paramédico. Por favor, venga conmigo para que podamos colocar una vía intravenosa y tomar algunas muestras de sangre.",
    file: require("./assets/intro.mp3"),
  },
  {
    label: "Give us your blood",
    english:
      "We are going to start an IV. The IV catheter will stay in place so that we can obtain additional blood samples and give medications as needed without having to stick you multiple times.",
    spanish:
      "Vamos a ponerle una vía intravenosa. El catéter se quedará en su lugar para que podamos tomar más muestras de sangre y darle medicamentos si es necesario, sin tener que pincharlo varias veces.",
    file: require("./assets/give_us_your_blood.mp3"),
  },
  {
    label: "I'm sorry",
    english: "I'm sorry",
    spanish: "Lo siento",
    file: require("./assets/lo_siento.mp3"),
  },
  {
    label: "Outro",
    english:
      "We have completed all the tasks that we have for now. Please return to the waiting room. They will call your name when a treatment space is available for you.",
    spanish:
      "Ya hemos terminado por ahora. Por favor, regrese a la sala de espera. Le llamarán cuando haya un espacio disponible para atenderle.",
    file: require("./assets/outro.mp3"),
  },
];

export default function App() {
  const sound = React.useRef(new Audio.Sound());

  const playSound = async (file) => {
    try {
      await sound.current.unloadAsync();
      await sound.current.loadAsync(file);
      await sound.current.playAsync();
    } catch (error) {
      console.log("Error playing sound", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>¡Lo Siento!</Text>
      <FlatList
        data={phrases}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => playSound(item.file)}
          >
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.english}>{item.english}</Text>
            <Text style={styles.spanish}>{item.spanish}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    justifyContent: "center",
    width: "80%",
    margin: "auto",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  label: { fontSize: 16, fontWeight: "bold", color: "white", marginBottom: 5 },
  english: { fontSize: 14, color: "white" },
  spanish: { fontSize: 14, color: "white", fontStyle: "italic" },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "red", // optional, matches your button color
  },
});
