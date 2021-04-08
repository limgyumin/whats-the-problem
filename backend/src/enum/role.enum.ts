enum UserRole {
  Client = 'Client',
  Admin = 'Admin',
}

export type AllowedRole = keyof typeof UserRole | 'Any';
