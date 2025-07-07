import fs from 'fs';
import path from 'path';
import { User, Book } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');

export const readJsonFile = <T>(filename: string): T => {
  const filePath = path.join(DATA_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
};

export const writeJsonFile = <T>(filename: string, data: T): void => {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const getUsers = (): User[] => {
  return readJsonFile<User[]>('users.json');
};

export const saveUsers = (users: User[]): void => {
  writeJsonFile('users.json', users);
};

export const getBooks = (): Book[] => {
  return readJsonFile<Book[]>('books.json');
};

export const saveBooks = (books: Book[]): void => {
  writeJsonFile('books.json', books);
};

export const getCategories = (): string[] => {
  return readJsonFile<string[]>('categories.json');
};

export const getUserById = (id: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.email === email);
};

export const getBookById = (id: string): Book | undefined => {
  const books = getBooks();
  return books.find(book => book.id === id);
};
