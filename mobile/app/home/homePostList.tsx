import { useEffect, useState } from "react";
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import PostCard from "~/components/PostCard";

interface ApiPost {
  id: string;
  author?: {
    name: string;
    email: string;
    image?: string;
  };
  content: string;
  mediaUrl?: string;
  mediaSrc?: string;
  _count?: {
    likes: number;
    comments: number;
  };
  createdAt: string;
}

export default function SecaoPost() {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://piupiuwer-monorepo-web.vercel.app/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(Array.isArray(data) ? data : data.posts ?? []))
      .catch(() => setError("Não foi possível carregar os posts."))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Carregando posts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <PostCard
          post={{
            id: item.id,
            userName: item.author?.name ?? "Usuário",
            userHandle: item.author?.email.split("@")[0] ?? "usuario",
            profilePic: item.author?.image,
            content: item.content,
            mediaSrc: item.mediaUrl ?? item.mediaSrc,
            likes: item._count?.likes ?? 0,
            comments: item._count?.comments ?? 0,
            createdAt: new Date(item.createdAt).toLocaleDateString("pt-BR"),
          }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    color: "#475569",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 15,
    textAlign: "center",
  },
});