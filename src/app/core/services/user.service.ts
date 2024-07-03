import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private storageKey = 'UserList';
  constructor() { }

  generateUniqueId(): string {
    const timestamp = new Date().getTime(); // Get current timestamp in milliseconds
    return timestamp.toString(); // Convert timestamp to string (you can use it as per your requirement)
  }

  setItem(items: any): void {
    

    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }


  addItem(item: any): void {
    const uniqueId = this.generateUniqueId();
    item.id=uniqueId;
    // Retrieve the existing UserList from localStorage
    const userListString = localStorage.getItem(this.storageKey);
    
    // Parse it into an array
    let userList: any[] = [];
    if (userListString) {
     let userListNew = JSON.parse(userListString);
     userList =userListNew;
    }

    // Add the new item to the array
    userList.push(item);

    // Serialize the array back to a string
    this.setItem(userList);
  }

  // getItem() {
  //   const data = sessionStorage.getItem(this.storageKey);
  //   if (data) {
  //     return JSON.parse(data);
  //   }
  //   return null;
  // }
  getItem(): any[] {
    const userListString = localStorage.getItem(this.storageKey);
    if (userListString) {
      try {
        const parsedList = JSON.parse(userListString);
        if (Array.isArray(parsedList)) {
          return parsedList;
        }
      } catch (e) {
        console.error('Error parsing UserList from localStorage', e);
      }
    }
    return [];
  }

  // removeItem(id: number): void {
  //   const items = this.getItem();
  //   if (items) {
  //     const updatedItems = items.filter((item: any) => item.id !== id);
  //     this.setItem(updatedItems);
  //   }
  // }


  removeItem(id: string): void {
    let userList = this.getItem();

    // Filter out the item with the specified id
    userList = userList.filter(user => user.id !== id);

    // Save the updated list back to localStorage
    this.setItem(userList);
  }

  editItem(id: number, updatedItem: any): void {
    const items = this.getItem();
    if (items) {
      const updatedList = items.map((item: any) => item.id === id ? updatedItem : item);
      this.setItem(updatedList);
    }
  }

  updateItemById(id: string, updatedItem: any): void {
    const userList = this.getItem();
    const index = userList.findIndex(user => user.id === id);

    if (index !== -1) {
      userList[index] = { ...userList[index], ...updatedItem };
      this.setItem(userList);
    }
  }


  // Method to filter users based on age criteria
  filterUsersByAge(): { age18to30: number, age31to50: number, age51to70: number } {
    const users = this.getItem();
    const age18to30 = users.filter(user => user.age >= 18 && user.age <= 30).length;
    const age31to50 = users.filter(user => user.age >= 31 && user.age <= 50).length;
    const age51to70 = users.filter(user => user.age >= 51 && user.age <= 70).length;
    return { age18to30, age31to50, age51to70 };
  }
  

}
