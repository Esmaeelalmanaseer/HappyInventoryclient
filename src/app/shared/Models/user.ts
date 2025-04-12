export interface user{
    email:string;
    roles:string[]
}

export interface UserDto {
    id: string;
    email: string;
    fullName: string;
    role: string;
    active: boolean;
  }

  export interface UpdateUserDto {
    id: string;
    fullName: string;
    role: string;
    isactive: boolean;
  }

  export interface ChangePasswordDto {
    userId: string;
    newPassword: string;
  }

  export interface RegisterRequistDto {
    email: string;
    fullName: string;
    password: string;
    role: string;
    isactive: boolean;
  }