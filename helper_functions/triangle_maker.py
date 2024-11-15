from random import choice, randint

import random

def triangle_make(try_level, number):

#    x = randint(6,20)
    x = number
    a = int(((x**2+x)/2)+3*x-3)
    b = int(((x**2+x)/2)+6)

    options = []

    for i in range(b,a+1):
        if i%3==0:
            options.append(i)

    c = choice(options)

    w = c/3
    print(w)
    print(x)
    triangle_solve(x,w,try_level)

def corner_solve(n,side,count_max):

    count = 0

    x = side*3-((n**2+n)/2)

    corners = []
    while sum(corners) != x or len(corners) != 3 and count < count_max:
        full_list = []
        for i in range(1,n+1):
            full_list.append(i)
        random.shuffle(full_list)
        corners = []
        for i in full_list:
            if i <= x - sum(corners):
                corners.append(i)
                full_list.remove(i)

        count += 1

    if len(corners) != 3:
        corners = [0,0,0]

    side_a = [corners[0],corners[1]]
    side_b = [corners[1],corners[2]]
    side_c = [corners[2],corners[0]]

    return(side_a,side_b,side_c,full_list,count)


def side_fill(side_x,remainder,side,count_max):

    count = 0
    side_test = []
    remainder_test = []

    while sum(side_test) != side and count < count_max:

        side_test=[]
        for i in side_x:
            side_test.append(i)
        remainder_test = []
        for i in remainder:
            remainder_test.append(i)
        random.shuffle(remainder_test)

        for i in remainder_test:
            if i <= side - sum(side_test):
                side_test.append(i)
                remainder_test.remove(i)

        count += 1

    return(side_test,remainder_test,count)

def triangle_solve(n,side,count_max):

    side_a=[]
    side_b=[]

    for i in range(count_max):

        initial_sides=corner_solve(n,side,count_max)

        side_a=initial_sides[0]
        side_b=initial_sides[1]

        remainder = initial_sides[3]

        round_0 = initial_sides[4]

        if round_0 < count_max:
            round_1 = side_fill(side_a,remainder,side,count_max)

            if round_1[2] < count_max:
                round_2 = side_fill(side_b,round_1[1],side,count_max)

                if round_2[2] < count_max:
                    side_a = round_1[0]
                    side_b = round_2[0]

                    print(side_a,side_b)
                    break

        if i == count_max-1:
            print("Could not solve.")
