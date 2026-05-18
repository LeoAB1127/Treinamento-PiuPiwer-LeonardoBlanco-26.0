import { useState } from "react";
import { ScrollView, View, TouchableOpacity, Text, SafeAreaView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import CarouselWS2 from "~/components/Carrosel/carrouselWslides";
import Sidebar from "~/components/Sidebar";
import { Menu } from "lucide-react-native";
import CriarPost from "~/components/CriarPost";
import { MAIN_MENU } from "~/constants/menu";
import PostList from "./homePostList";

export default function FeedScreen() {
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(false);

    const handleNavigate = (href: string) => {
    try {
      
      if (href === "/home/feed") {
        setSidebarVisible(false);
        return;
      }

      if (href === "/auth/login") {
        router.replace(href as "/home/feed");
        return;
      }

      if (href === "/profile/perfil") {
        router.replace(href as "/profile/perfil");
        return;
      }

      router.push(href as any);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };


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
          <Text style={styles.brand}>Piupiwer</Text>
          <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.menuButton}>
            <Menu size={26} color="#0f172a" />
          </TouchableOpacity>
        </View>

        <CarouselWS2 />

        <CriarPost></CriarPost>

        <PostList></PostList>

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
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 22,
    marginBottom: 18,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },
  sectionHeader: {
    marginTop: 8,
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
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});