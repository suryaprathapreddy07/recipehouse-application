# # print('hello')
# class list:
#     def __init__(self,age) -> None:
#         self.age=age
        
#     def greet(self):
#         return f"hello{self.name}!"
# class C1(list):
#     def __init__(self,name,age) -> None:
#         super().__init__(age)
#         self.name=name
#     #here greet method overights parent greet method
#     def greet(self):
#         return f"hi {self.name}"
# obj1=C1('surya',21)
# print(obj1)

# from re import T
# from cProfile import label
# from tkinter import Tk,Label
# root=Tk()
# hello=Label(master=root,text='hellp gui world')
from tkinter import *
window=Tk()
btn=Button(window, text="This is Button widget", fg='blue')
btn.place(x=80, y=100)
window.title('Hello Python')
window.geometry("300x200+10+10")
window.mainloop()