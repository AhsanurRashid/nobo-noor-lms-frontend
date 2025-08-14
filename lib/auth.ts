import { cookies } from 'next/headers'

export async function setToken(token: string) {
  (await cookies()).set('auth_token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}

export async function getToken() {
  return (await cookies()).get('auth_token')?.value
}

export async function removeToken() {
  (await cookies()).delete('auth_token')
}

export async function setUserId(userId: string) {
  (await cookies()).set('auth_user_id', userId, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  })
}
export async function getUserId() {
  return (await cookies()).get('auth_user_id')?.value
}

export async function removeUserId() {
  (await cookies()).delete('auth_user_id')
}