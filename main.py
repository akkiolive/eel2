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


#BOKEH

# 折れ線グラフをhtml出力する
from bokeh.plotting import figure, output_file, show, save

# データの作成
x = [1, 2, 3, 4, 5]
y = [6, 7, 2, 4, 5]

# 出力HTMLファイルパスを指定
output_file("web/plot.html")


# タイトルと軸ラベルを指定したfigureを定義
p = figure(title = "simple line example", x_axis_label = "x", y_axis_label = "y", width = 1000, height = 150)

# プロットに判例と線の暑さを指定したrenderer(今回は折れ線グラフ)を追加
p.line(x, y, legend = "Temp", line_width = 2)

# 結果を描画
save(p)


#END BOKEH




#call js function
eel.onbeforestarteel()

#Start eel
print("Start eel: main.html")
eel.start("main.html", size=(1000, 800))