cmake_minimum_required(VERSION 3.13)

project(aes C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_C_Extensions OFF)

file(GLOB SRC_FILES CONFIGURE_DEPENDS
    "${CMAKE_CURRENT_SOURCE_DIR}/src/*.c",
    "${CMAKE_CURRENT_SOURCE_DIR}/src/**/*.c"
)

add_executable(aes ${SRC_FILES})

target_include_directories(aes PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
)

target_compile_options(aes PRIVATE -Wall -Wextra -Wpedantic -Werror)