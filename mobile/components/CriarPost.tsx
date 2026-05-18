import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type CriarPostProps = {
  onCreatePost?: (text: string, imageUrl?: string) => void;
};

export default function CriarPost({ onCreatePost }: CriarPostProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePost = async () => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onCreatePost?.(content.trim());
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Criar um novo post</Text>
      <TextInput
        style={styles.input}
        placeholder="Sobre o que você quer falar?"
        placeholderTextColor="#94a3b8"
        multiline
        value={content}
        onChangeText={setContent}
        editable={!isSubmitting}
      />

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton, isSubmitting && styles.disabledButton]}
          onPress={handlePost}
          disabled={isSubmitting || !content.trim()}
        >
          <Text style={styles.primaryButtonText}>
            {isSubmitting ? 'Postando...' : 'Postar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton, styles.buttonSpacing]}
          onPress={() => alert('Funcionalidade em desenvolvimento!')}
        >
          <Text style={styles.secondaryButtonText}>Anexar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 18,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  input: {
    minHeight: 100,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    color: '#0f172a',
    textAlignVertical: 'top',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonSpacing: {
    marginLeft: 10,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#334155',
    fontWeight: '700',
  },
});