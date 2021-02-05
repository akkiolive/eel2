import eel

#Init eel
print("Init eel...")
eel.init("web")

#call js function
eel.js_function("hello eel.")

#define python function
@eel.expose
def python_function(val):
    print(val, "from JavaScript")

#Start eel
print("Start eel: main.html")
eel.start("main.html", size=(1000, 800))