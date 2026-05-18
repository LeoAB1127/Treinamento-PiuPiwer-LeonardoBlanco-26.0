import { View, Text, Image } from "react-native";
import PostCard from "~/components/PostCard"

export default function UserPostList() {

    const user = {
    name: "João Silva",
    handle: "joaosilva",
    bio: "Desenvolvedor mobile apaixonado por UX e por criar apps que funcionam bonito e rápido.",
    location: "São Paulo, BR",
    posts: 24,
    followers: 520,
    following: 180,
    profilePic: "",
  };
  
  return (
    <View>
      <PostCard post={{
          userName: user.name,
          userHandle: user.handle,
          content: "Acabei de lançar meu novo app! Dá uma olhada e me diz o que achou! #mobile #reactnative",
          createdAt: "2h atrás",
          likes: 120,
          comments: 45,
        }} />
        <PostCard post={{
          userName: user.name,
          userHandle: user.handle,
          content: "Dica do dia: Sempre teste seu app em dispositivos reais para garantir a melhor experiência possível! #dica #mobile",
          createdAt: "1d atrás",
          likes: 89,
          comments: 23,
        }} />
        </View>
  );
}
