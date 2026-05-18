import { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, SafeAreaView, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import Sidebar from "~/components/Sidebar";
import { Menu, Home, User, Info, LogOut } from "lucide-react-native";
import { MAIN_MENU } from "~/constants/menu";
import UserPostList from "./postListUser";

export default function PerfilScreen() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

//Como o login não está funcionando, os dados do usuário estão hardcoded aqui, 
// para fins de desenvolvimento da interface. Quando o login estiver pronto, 
// esses dados devem ser obtidos corretamente.

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

  const handleNavigate = (href: string) => {
    try {

      if (href === "/profile/perfil") {
        setSidebarVisible(false);
        return;
      }

      if (href === "/auth/login") {
        router.replace(href as "/home/feed");
        return;
      }

      if (href === "/home/feed") {
        router.replace(href as "/home/feed");
        return;
      }

      router.push(href as any);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigate={handleNavigate}
        items={MAIN_MENU}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Text style={styles.brand}>Perfil</Text>
          <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
            <Menu size={26} color="#0f172a" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
            <View style={styles.avatar}>
            {user.profilePic ? (
              <Image source={{ uri: user.profilePic }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{user.name  .slice(0, 2).toUpperCase()}</Text>
            )}
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileHandle}>@{user.handle}</Text>
          <Text style={styles.profileBio}>{user.bio}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.followers}</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.following}</Text>
              <Text style={styles.statLabel}>Seguindo</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <User size={16} color="#334155" />
            <Text style={styles.infoText}>{user.location}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Publicações</Text>
        </View>
        <UserPostList></UserPostList>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#475569',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  brand: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  menuButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 14,
    padding: 10,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 22,
    marginBottom: 20,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
    avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  }, 
   userInfo: {},
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  profileHandle: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 14,
  },
  profileBio: {
    marginTop: 12,
    color: '#475569',
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },
  statLabel: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 12,
  },
  infoRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    marginLeft: 8,
    color: '#334155',
    fontSize: 14,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  sectionSubTitle: {
    marginTop: 4,
    color: '#64748b',
    fontSize: 14,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoLabel: {
    color: '#94a3b8',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  infoValue: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
  },
});
