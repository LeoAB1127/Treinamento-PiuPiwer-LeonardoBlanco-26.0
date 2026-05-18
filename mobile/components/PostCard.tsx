import { Image, StyleSheet, Text, View } from 'react-native';

type Post = {
  id: string;
  userName: string;
  userHandle: string;
  profilePic?: string;
  createdAt: string;
  content: string;
  likes: number;
  comments: number;
  mediaSrc?: string;
};

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const { userName, userHandle, profilePic, content, createdAt, likes, comments, mediaSrc } = post;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>{userName.slice(0, 2).toUpperCase()}</Text>
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userMeta}>{`@${userHandle} · ${createdAt}`}</Text>
        </View>
      </View>

      <Text style={styles.content}>{content}</Text>

      {mediaSrc ? (
        <View style={styles.imageWrapper}>
          <Image source={{ uri: mediaSrc }} style={styles.postImage} />
        </View>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>{likes} curtidas</Text>
        <Text style={styles.footerText}>{comments} comentários</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
  },  userInfo: {
    marginLeft: 12,
  },
  userName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
  },
  userMeta: {
    color: '#6b7280',
    fontSize: 13,
    marginTop: 2,
  },
  content: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 22,
  },
  imageWrapper: {
    marginTop: 14,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#f8fafc',
  },
  postImage: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  footerText: {
    color: '#64748b',
    fontSize: 13,
  },
});
