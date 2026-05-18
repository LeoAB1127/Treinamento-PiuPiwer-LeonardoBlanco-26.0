import { type ReactNode } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';

export interface SidebarItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
  items: SidebarItem[];
};

export default function Sidebar({ visible, onClose, onNavigate, items }: SidebarProps) {
  const handleNavigation = (route: string) => {
    onClose();
    onNavigate(route);
  };

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />

        <View style={styles.sidebar}>
          {/* Header */}
          <View style={styles.sidebarHeader}>
            <Text style={styles.headerTitle}>Menu de Navegação</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={22} color="#111" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView 
            style={styles.sidebarContent} 
            showsVerticalScrollIndicator={false}
            scrollEnabled={items.length > 4}
          >
            <View style={styles.menu}>
              {items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleNavigation(item.href)}
                  activeOpacity={0.7}
                >
                  <View style={styles.iconWrapper}>
                    {item.icon}
                  </View>
                  <Text style={styles.menuText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.sidebarFooter}>
            <Text style={styles.footerText}>v1.0.0</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  sidebar: {
    width: 280,
    paddingTop: Platform.OS === 'android' ? 40 : 56,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 12,
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 8,
    marginRight: -8,
  },
  sidebarContent: {
    flex: 1,
  },
  menu: {
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 15,
    color: '#111827',
    marginLeft: 12,
    fontWeight: '500',
  },
  sidebarFooter: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
