# MAC 真机和模拟器调试

## mac 连接 ios 模拟器

1. 打开 xcode；
2. 选中要运行的项目；
3. 运行 => 运行到 ios 模拟器 APP 基座；

## mac 连接 android 模拟器

1. 运行配置，选择 adb 路径，mumu 模拟器端口 7555；
2. 打开 mumu 模拟器；
   1. 这个模拟器有问题，显示有问题；
   2. <https://www.cnblogs.com/judeyq/p/12187461.html>；
   3. `echo 0x2717 >> ~/.android/adb_usb.ini`
3. 选中要运行的项目；
4. 运行 => 运行到 android 模拟器 APP 基座；
5. 首次需要界面设置；
   1. 右上角设置 => 界面设置 => 自定义 750 \* 1334
   2. 这里似乎有问题呀，页面展示都不正常？？？

## mac 连接 android 真机

1. 连接真机，打开开发者模式，连接到 mac 上，可以传输文件的操作；
2. 选中要运行的项目；
3. 运行 => 运行到 adroid 设备；

## mac 连接 ios 真机

1. 连接真机，打开开发者模式，连接到 mac 上，可以传输文件的操作；
2. 选中要运行的项目；
3. 运行 => 运行到 ios 设备；
