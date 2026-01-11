---
title: "Object-Oriented Programming - Classes and Objects"
description: "Build organized, scalable code with OOP principles"
image: "/img/python-oop.png"
type: "article"
resources:
  - name: "OOP Concepts PDF"
    link: "https://example.com/oop-concepts.pdf"
    type: "pdf"
  - name: "Interactive Colab Tutorial"
    link: "https://colab.research.google.com/drive/oop-notebook"
    type: "colab"
---

## Classes and Objects

```python
# Define a class
class Student:
    def __init__(self, name, age, major):
        self.name = name
        self.age = age
        self.major = major
    
    def introduce(self):
        return f"My name is {self.name}, I'm {self.age}, studying {self.major}"
    
    def study(self, subject):
        return f"{self.name} is studying {subject}"

# Create objects
student1 = Student("John", 20, "Computer Science")
student2 = Student("Jane", 19, "Mathematics")

# Use objects
print(student1.introduce())
print(student2.study("Algebra"))
```

## Inheritance
Inherit properties and methods from a parent class.

```python
class Person:
    def __init__(self, name):
        self.name = name
    
    def greet(self):
        return f"Hello, I'm {self.name}"

class Teacher(Person):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject
    
    def teach(self):
        return f"{self.name} teaches {self.subject}"

teacher = Teacher("Mr. Smith", "Mathematics")
print(teacher.greet())
print(teacher.teach())
```

## Encapsulation
Hide internal details using private attributes.

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # Private attribute
    
    def deposit(self, amount):
        self.__balance += amount
    
    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
        else:
            print("Insufficient funds")
    
    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
account.deposit(500)
print(account.get_balance())  # 1500
```

## Key OOP Principles
- **Encapsulation**: Hide complexity
- **Inheritance**: Reuse code
- **Polymorphism**: Same interface, different implementations
- **Abstraction**: Show only what's necessary
