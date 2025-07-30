import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  ScrollView,
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [screenData, setScreenData] = React.useState(Dimensions.get('window'));

  React.useEffect(() => {
    const onChange = (result) => {
      setScreenData(result.window);
    };
    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  React.useEffect(() => {
    return () => {
      // Cleanup sound on unmount
      if (sound.current) {
        sound.current.unloadAsync();
      }
    };
  }, []);

  const playSound = async (file) => {
    try {
      setIsLoading(true);
      
      // Unload previous sound
      await sound.current.unloadAsync();
      
      // Load and play new sound
      await sound.current.loadAsync(file);
      await sound.current.playAsync();
    } catch (error) {
      console.log("Error playing sound", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isWeb = Platform.OS === 'web';
  const isTablet = screenData.width >= 768;
  const isDesktop = screenData.width >= 1024;
  const isMobile = screenData.width < 768;

  return (
    <View style={[styles.container, isWeb && styles.webContainer]}>
      <Text style={[styles.heading, isWeb && styles.webHeading]}>¡Lo Siento!</Text>
      <Text style={[styles.subtitle, isWeb && styles.webSubtitle]}>
        Medical Spanish Communication Aid
      </Text>
      
      {/* Use ScrollView with flexWrap for mobile, FlatList for desktop */}
      {isMobile ? (
        <ScrollView 
          contentContainerStyle={[
            styles.scrollContainer,
            isWeb && styles.webScrollContainer
          ]}
          showsVerticalScrollIndicator={false}
        >
          {phrases.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.button,
                isWeb && styles.webButton,
                isMobile && styles.mobileButton,
                isLoading && styles.buttonDisabled
              ]}
              onPress={() => playSound(item.file)}
              disabled={isLoading}
              accessibilityLabel={`Play ${item.label} in Spanish`}
              accessibilityHint="Double tap to play audio translation"
            >
              <Text style={[styles.label, isWeb && styles.webLabel, isMobile && styles.mobileLabel]}>
                {item.label}
              </Text>
              <Text style={[styles.english, isWeb && styles.webEnglish, isMobile && styles.mobileEnglish]}>
                {item.english}
              </Text>
              <Text style={[styles.spanish, isWeb && styles.webSpanish, isMobile && styles.mobileSpanish]}>
                {item.spanish}
              </Text>
              {isLoading && (
                <Text style={styles.loadingText}>Loading...</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={phrases}
          keyExtractor={(_, index) => index.toString()}
          numColumns={isDesktop ? 2 : 1}
          key={isDesktop ? 'desktop' : 'mobile'} // Force re-render when columns change
          contentContainerStyle={[
            styles.listContainer,
            isWeb && styles.webListContainer,
            isDesktop && styles.desktopListContainer
          ]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.button,
                isWeb && styles.webButton,
                isTablet && styles.tabletButton,
                isDesktop && styles.desktopButton,
                isLoading && styles.buttonDisabled
              ]}
              onPress={() => playSound(item.file)}
              disabled={isLoading}
              accessibilityLabel={`Play ${item.label} in Spanish`}
              accessibilityHint="Double tap to play audio translation"
            >
              <Text style={[styles.label, isWeb && styles.webLabel]}>{item.label}</Text>
              <Text style={[styles.english, isWeb && styles.webEnglish]}>{item.english}</Text>
              <Text style={[styles.spanish, isWeb && styles.webSpanish]}>{item.spanish}</Text>
              {isLoading && (
                <Text style={styles.loadingText}>Loading...</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
      
      {isWeb && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Click any phrase to hear the Spanish pronunciation
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  webContainer: {
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
    paddingTop: 40,
    paddingHorizontal: 40,
    minHeight: '100vh',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  webScrollContainer: {
    paddingBottom: 60,
  },
  listContainer: {
    paddingBottom: 40,
  },
  webListContainer: {
    paddingBottom: 60,
  },
  desktopListContainer: {
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mobileButton: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  webButton: {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#0056CC',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)',
    },
  },
  tabletButton: {
    padding: 25,
    marginBottom: 20,
  },
  desktopButton: {
    flex: 1,
    marginHorizontal: 10,
    padding: 25,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "white", 
    marginBottom: 8,
    textAlign: 'center',
  },
  mobileLabel: {
    fontSize: 16,
    marginBottom: 6,
  },
  webLabel: {
    fontSize: 20,
    marginBottom: 10,
  },
  english: { 
    fontSize: 16, 
    color: "white", 
    marginBottom: 8,
    lineHeight: 22,
  },
  mobileEnglish: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  webEnglish: {
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 10,
  },
  spanish: { 
    fontSize: 16, 
    color: "white", 
    fontStyle: "italic",
    lineHeight: 22,
  },
  mobileSpanish: {
    fontSize: 14,
    lineHeight: 20,
  },
  webSpanish: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  heading: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#d32f2f",
  },
  webHeading: {
    fontSize: 48,
    marginBottom: 10,
    fontFamily: Platform.select({
      web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      default: undefined,
    }),
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    fontStyle: 'italic',
  },
  webSubtitle: {
    fontSize: 20,
    marginBottom: 40,
    color: "#555",
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
  },
});
