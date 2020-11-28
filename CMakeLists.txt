cmake_minimum_required(VERSION 3.17)
project(untitled)

set(CMAKE_CXX_STANDARD 98)
set(CMAKE_EXE_LINKER_FLAGS "-static")
add_executable(untitled main.cpp)
set_target_properties(${PROJECT_NAME} PROPERTIES OUTPUT_NAME "caffparser")