import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signInWithEmail = useAuthStore((s) => s.signInWithEmail);
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle);

  const handleLogin = async () => {
    setErrorMessage(null);
    setLoading(true);
    const error = await signInWithEmail(email.trim(), password);
    setLoading(false);
    if (error) setErrorMessage(error);
  };

  const handleGoogle = async () => {
    setErrorMessage(null);
    setGoogleLoading(true);
    const error = await signInWithGoogle();
    setGoogleLoading(false);
    if (error) setErrorMessage(error);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.logoMark}>
          <MaterialIcons name="bolt" size={32} color={colors.onPrimary} />
        </View>
        <Text style={styles.brand}>AppTech Hub</Text>
        <Text style={styles.subtitle}>오늘 받을 수 있는 모든 혜택을 한곳에서</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="이메일"
            placeholderTextColor={colors.outline}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor={colors.outline}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

          <PrimaryButton label="로그인" onPress={handleLogin} loading={loading} />

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerLabel}>또는</Text>
            <View style={styles.divider} />
          </View>

          <Pressable
            style={({ pressed }) => [styles.googleButton, pressed && styles.pressed]}
            onPress={handleGoogle}
            disabled={googleLoading}
          >
            <MaterialIcons name="g-translate" size={18} color={colors.onSurface} />
            <Text style={styles.googleLabel}>Google로 계속하기</Text>
          </Pressable>
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>아직 계정이 없으신가요?</Text>
          <Link href="/(auth)/signup" replace asChild>
            <Pressable>
              <Text style={styles.footerLink}>회원가입</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  content: {
    flexGrow: 1,
    padding: spacing.containerPadding,
    paddingTop: 96,
    alignItems: 'center',
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.stackMd,
  },
  brand: { ...typography.headlineLg, color: colors.primary, marginBottom: 4 },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.sectionGap,
    textAlign: 'center',
  },
  form: { width: '100%', gap: spacing.stackMd },
  input: {
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: radius.md,
    paddingHorizontal: spacing.stackMd,
    paddingVertical: 14,
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  error: { ...typography.labelMd, color: colors.error },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.stackSm },
  divider: { flex: 1, height: 1, backgroundColor: colors.outlineVariant },
  dividerLabel: { ...typography.labelSm, color: colors.onSurfaceVariant },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.stackSm,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: radius.md,
    paddingVertical: 14,
    backgroundColor: colors.surfaceContainerLowest,
  },
  pressed: { transform: [{ scale: 0.98 }] },
  googleLabel: { ...typography.labelMd, fontWeight: '600', color: colors.onSurface },
  footerRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: spacing.sectionGap,
  },
  footerText: { ...typography.labelMd, color: colors.onSurfaceVariant },
  footerLink: { ...typography.labelMd, color: colors.primary, fontWeight: '700' },
});
