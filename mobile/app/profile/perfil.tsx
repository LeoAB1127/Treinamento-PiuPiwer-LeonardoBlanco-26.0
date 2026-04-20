import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, Button } from "react-native";
import { useRouter } from "expo-router";

export default function FeedScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-5 justify-center">
      <Text className="font-bold" style={{ fontSize: 32, marginBottom: 40, textAlign: 'center', color: '#007bff' }}>    
        Bem-vindo ao Piupiwer!
      </Text>
      <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20 }}>  
        Esta é a tela do seu perfil. 
      </Text>
      <Button title="Sair" onPress={() => router.replace('/auth/login')} />   
    </View>
  );
}