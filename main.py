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

class Communicator:
    def __init__(self):
        self._signal_list_all = []

    @property
    def signal_list_all(self):
        pass

    @signal_list_all.getter
    def signal_list_all(self):
        return self._signal_list_all

    @signal_list_all.setter
    def signal_list_all(self, val):
        self._signal_list_all = val
        eel.set_signal_list_all(val)
        print("Called set_signal_list_all!")

com = Communicator()
com.signal_list_all = [
    "HOGE",
    "NASHI",
    "KUSUNETA_RINGO",
    "INDIAN_METHOD"
]
com.signal_list_all.append("asdfadfjslkfjaldjas;lkja;lsdjkljd")



#call js function
eel.onbeforestarteel()

#Start eel
print("Start eel: main.html")
eel.start("main.html", size=(1000, 800))