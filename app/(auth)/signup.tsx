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

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail);

  const handleSignup = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    const error = await signUpWithEmail(email.trim(), password);
    setLoading(false);
    if (error) {
      setErrorMessage(error);
      return;
    }
    setSuccessMessage('가입 확인 이메일을 발송했습니다. 메일함을 확인해주세요.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Link href="/(auth)/login" replace asChild>
          <Pressable style={styles.backButton} hitSlop={8}>
            <MaterialIcons name="chevron-left" size={28} color={colors.primary} />
          </Pressable>
        </Link>

        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.subtitle}>몇 초면 가입이 끝나요.</Text>

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
            placeholder="비밀번호 (6자 이상)"
            placeholderTextColor={colors.outline}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            placeholderTextColor={colors.outline}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

          <PrimaryButton label="가입하기" onPress={handleSignup} loading={loading} />
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>이미 계정이 있으신가요?</Text>
          <Link href="/(auth)/login" replace asChild>
            <Pressable>
              <Text style={styles.footerLink}>로그인</Text>
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
    paddingTop: 72,
  },
  backButton: { marginBottom: spacing.stackLg },
  title: { ...typography.headlineLg, color: colors.onSurface, marginBottom: 4 },
  subtitle: { ...typography.bodyMd, color: colors.onSurfaceVariant, marginBottom: spacing.sectionGap },
  form: { gap: spacing.stackMd },
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
  success: { ...typography.labelMd, color: colors.tertiary },
  footerRow: { flexDirection: 'row', gap: 6, marginTop: spacing.sectionGap, justifyContent: 'center' },
  footerText: { ...typography.labelMd, color: colors.onSurfaceVariant },
  footerLink: { ...typography.labelMd, color: colors.primary, fontWeight: '700' },
});
