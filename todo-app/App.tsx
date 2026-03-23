import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

type Filter = 'all' | 'active' | 'done';

const initialTodos: Todo[] = [
  { id: '1', title: 'React Native ortamını kur', done: true },
  { id: '2', title: 'İlk görevini ekle', done: false },
  { id: '3', title: 'Bitirdiğinde işaretle', done: false },
];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [hideCompleted, setHideCompleted] = useState(false);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (hideCompleted && todo.done) return false;
      if (filter === 'active') return !todo.done;
      if (filter === 'done') return todo.done;
      return true;
    });
  }, [filter, hideCompleted, todos]);

  const remainingCount = todos.filter((todo) => !todo.done).length;

  const addTodo = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((current) => [
      {
        id: Date.now().toString(),
        title: trimmed,
        done: false,
      },
      ...current,
    ]);
    setText('');
  };

  const toggleTodo = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  const removeTodo = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.done));
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="light" />
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Murat için mini app</Text>
        <Text style={styles.title}>To-Do List</Text>
        <Text style={styles.subtitle}>
          Gününü temiz tut. Küçük işler birikmeden bitsin.
        </Text>

        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Yeni görev yaz..."
            placeholderTextColor="#94a3b8"
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={addTodo}
          />
          <Pressable style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>Ekle</Text>
          </Pressable>
        </View>

        <View style={styles.toolbar}>
          <View style={styles.filterRow}>
            {(['all', 'active', 'done'] as Filter[]).map((item) => {
              const active = filter === item;
              const label =
                item === 'all'
                  ? 'Tümü'
                  : item === 'active'
                    ? 'Aktif'
                    : 'Biten';

              return (
                <Pressable
                  key={item}
                  style={[styles.filterButton, active && styles.filterButtonActive]}
                  onPress={() => setFilter(item)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      active && styles.filterButtonTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Tamamlananları gizle</Text>
            <Switch value={hideCompleted} onValueChange={setHideCompleted} />
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{remainingCount} görev kaldı</Text>
          <Pressable onPress={clearCompleted}>
            <Text style={styles.clearText}>Tamamlananları temizle</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
        >
          {visibleTodos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Liste temiz.</Text>
              <Text style={styles.emptyText}>
                Yeni bir görev ekleyerek başlayabilirsin.
              </Text>
            </View>
          ) : (
            visibleTodos.map((todo) => (
              <View key={todo.id} style={styles.todoCard}>
                <Pressable
                  style={styles.todoMain}
                  onPress={() => toggleTodo(todo.id)}
                >
                  <View style={[styles.checkbox, todo.done && styles.checkboxDone]}>
                    {todo.done ? <Text style={styles.checkmark}>✓</Text> : null}
                  </View>
                  <Text style={[styles.todoText, todo.done && styles.todoTextDone]}>
                    {todo.title}
                  </Text>
                </Pressable>
                <Pressable onPress={() => removeTodo(todo.id)}>
                  <Text style={styles.deleteText}>Sil</Text>
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    paddingTop: 72,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  eyebrow: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    color: '#f8fafc',
    fontSize: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  input: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#f8fafc',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  addButton: {
    backgroundColor: '#22c55e',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  addButtonText: {
    color: '#052e16',
    fontWeight: '800',
    fontSize: 15,
  },
  toolbar: {
    gap: 14,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
  },
  filterButton: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#334155',
  },
  filterButtonActive: {
    backgroundColor: '#38bdf8',
    borderColor: '#38bdf8',
  },
  filterButtonText: {
    color: '#cbd5e1',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#082f49',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    color: '#cbd5e1',
    fontSize: 15,
  },
  summaryCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  summaryTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '700',
  },
  clearText: {
    color: '#fda4af',
    fontWeight: '700',
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 12,
    paddingBottom: 28,
  },
  emptyState: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  emptyTitle: {
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: 15,
    lineHeight: 21,
  },
  todoCard: {
    backgroundColor: '#111827',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  todoMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#64748b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  checkmark: {
    color: '#052e16',
    fontWeight: '900',
  },
  todoText: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 16,
    lineHeight: 22,
  },
  todoTextDone: {
    color: '#94a3b8',
    textDecorationLine: 'line-through',
  },
  deleteText: {
    color: '#f87171',
    fontWeight: '700',
  },
});
