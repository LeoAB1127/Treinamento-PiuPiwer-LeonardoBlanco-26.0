import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "~/contexts/AuthContext";

export default function CadastroScreen() {
  const { signUp, isLoading: authLoading } = useAuth(); 
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !passwordConfirm) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    const result = await signUp(email, password);
    
    if (!result.success) {
      Alert.alert("Cadastro Falhou", result.error || "Ocorreu um erro :(");
    }

    setIsLoading(false);
  };
  if (authLoading) {
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
        Piupiwer
      </Text>
      <Text className="font-bold" style={{ fontSize: 32, marginBottom: 40, textAlign: 'center' }}>
        Entre na sua conta!
      </Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 15,
          marginBottom: 15,
          borderRadius: 8,
          fontSize: 16,
        }}
      />
      
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 15,
          marginBottom: 20,
          borderRadius: 8,
          fontSize: 16,
        }}
      />
      <TextInput
        placeholder="Repita sua senha"
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 15,
          marginBottom: 20,
          borderRadius: 8,
          fontSize: 16,
        }}>
        </TextInput>
      
      <TouchableOpacity
        onPress={handleSignUp}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          padding: 15,
          borderRadius: 8,
          marginBottom: 15,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
            Cadastre-se
          </Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => router.push('/login')}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? '#ccc' : '#db4437',
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
            Entrar com Google
          </Text>
        )}
      </TouchableOpacity>
      
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text>Já tem uma conta? </Text>
        <TouchableOpacity 
        disabled={isLoading} onPress={() => router.push('/login')}>
        <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Entrar
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}