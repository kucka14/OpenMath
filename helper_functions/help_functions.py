from puzzle.models import Resource, Standard, Tab, Tag, SaveList
from puzzle.view_functions import load_standards_string
import json
from django.db.models import Q

def set_categories():
    a = Category.objects.get(name='Quick Puzzle')
    b = Category.objects.get(name='Lesson Activity')
    c = Category.objects.get(name='Extended Challenge')
    for line in category_list:
        r = Resource.objects.get(id=line[0])
        if r.category.name == 'Activity':
            print(r.name)
            if line[2] == 1:
                r.category = a
            elif line[2] == 2:
                r.category = b
            else:
                r.category = c
            r.save()


def move_tab(old_tab, new_tab):
    old_tab_query = Tab.objects.filter(name=old_tab)
    new_tab_query = Tab.objects.filter(name=new_tab)
    if len(old_tab_query) != 1 or len(new_tab_query) != 1:
        print('ERROR')
    else:
        old_tab = old_tab_query[0]
        new_tab = new_tab_query[0]
        old_group = Resource.objects.filter(tab=old_tab)
        for resource in old_group:
            resource.tab = new_tab
            resource.save()

def make_tags():
    resources = Resource.objects.filter(in_trash=False)
    for r in resources:
        category = r.category
        tag_query = Tag.objects.filter(name=category.name)
        if len(tag_query) == 1:
            tag = tag_query[0]
        elif len(tag_query) == 0:
            tag = Tag(name=category.name)
            tag.save()
        else:
            print('ERROR')
        tag.resources.add(r)
        tag.save()

def mass_assign_category():
    resources = Resource.objects.filter(in_trash=False)
    for r in resources:
        r.category = 'Activity'
        r.save()

def change_group_name(old_name, new_name):
    resources = Resource.objects.filter(group_name=old_name)
    for r in resources:
        r.group_name = new_name
        r.save()

def move_tab_group(group_name, new_tab):
    resource_group = Resource.objects.filter(group_name=group_name)
    for r in resource_group:
        r.group_name = 'temp141414'
        r.save()
    for r in resource_group:
        new_tab_query = Tab.objects.filter(name=new_tab)
        if len(new_tab_query) != 1:
            print('ERROR')
        else:
            new_tab = new_tab_query[0]
            r.tab = new_tab
            r.group_name = group_name
            r.save()

def change_group_grades(group_name, new_low, new_high):
    resource_group = Resource.objects.filter(group_name=group_name)
    for r in resource_group:
        r.group_name = '34e1e428c58b2cb72a4be0daf3be1d0e'
        r.save()
    for r in resource_group:
        r.grade_low = new_low
        r.grade_high = new_high
        r.group_name = group_name
        r.save()

def change_group_category(group_name, category_name):
    resource_group = Resource.objects.filter(group_name=group_name, in_trash=False)
    if len(resource_group) == 0:
        print('Could not find resource group ' + group_name)
    else:
        if len(resource_group) > 1:
            for r in resource_group:
                r.group_name = '34e1e428c58b2cb72a4be0daf3be1d0e'
                r.save()
        for r in resource_group:
            if category_name == '':
                category = Category.objects.get(color_count=0)
            else:
                category_query = Category.objects.filter(name=category_name)
                if len(category_query) == 1:
                    category = category_query[0]
                elif len(category_query) == 0:
                    category = Category(name=category_name)
                    category.save()
            r.category = category
            if len(resource_group) > 1:
                r.group_name = group_name
            else:
                print('Single change')
            r.save()
        if len(resource_group) > 1:
            print('Group change')



def load_categories(category_dict):
    for category_name in category_dict:
        group_list = category_dict[category_name]
        for group_name in group_list:
            group_name = group_name.lower()
            change_group_category(group_name, category_name)




def load_standards(standards_dict):
    for group_name in standards_dict:
        standards_string = standards_dict[group_name]
        group_name = group_name.lower()
        resource_group = Resource.objects.filter(group_name=group_name)
        for resource in resource_group:
            load_standards_string(standards_string, resource, debug=True)

def standards_to_list(in_file):
    f = open(in_file, 'r')
    fulltext = f.read()
    f.close()
    fulltext = fulltext.strip()
    textlist = fulltext.split('\n')
    couplet_list = []
    for i in range(0, len(textlist), 2):
        standard = textlist[i].strip().lower()
        standard = standard.split('.')
        standard = standard[3:]
        if len(standard) != 4:
            raise
        description = textlist[i+1].strip()
        couplet = [standard, description]
        couplet_list.append(couplet)
    return couplet_list

def load_standards_descriptions(in_file):
    couplet_list = standards_to_list(in_file)
    for couplet in couplet_list:
        standard = couplet[0]
        standard_query = Standard.objects.filter(grade=standard[0], category=standard[1], letter=standard[2], number=standard[3])
        if len(standard_query) == 1:
            target_standard = standard_query[0]
            target_standard.description = couplet[1]
            target_standard.save()
            print('1', standard)
        else:
            new_standard = Standard(grade=standard[0], category=standard[1], letter=standard[2], number=standard[3], description=couplet[1])
            new_standard.save()
            print('2', standard)

def load():
    for suffix in ['0','1','2','3','4','5','6','7','8','hsa','hsf','hsg','hsn','hss']:
        in_file = 'puzzle/standards_data/standards_' + suffix + '.txt'
        load_standards_descriptions(in_file)

def standards_to_group(group_name, standards_string):
    group_name = group_name.lower()
    resource_group = Resource.objects.filter(group_name=group_name)
    for resource in resource_group:
        load_standards_string(standards_string, resource, debug=True)

def standards_to_category(category_name, standards_string, only_blank=False):
    category = Category.objects.get(name=category_name)
    resource_group = Resource.objects.filter(category=category)
    for resource in resource_group:
        if only_blank:
            if len(resource.standard_set.all()) == 0:
                load_standards_string(standards_string, resource, debug=True)
        else:
            load_standards_string(standards_string, resource, debug=True)

def check_s3():
    tset = Tab.objects.all()
    output = ''
    for t in tset:
        item = 'Tab: ' + t.name + ', ' + str(t.id) + ', '
        output += item
        rset = Resource.objects.filter(tab=t)
        output += str(len(rset))
        output += '\n'
        for r in rset:
            if r.image.name != '':
                item = '    Resource: ' + r.name + ', ' + r.image.name + '\n'
                output += item
    f = open('temp.txt', 'w')
    f.write(output)
    f.close()

def list_resources():
    rset = Resource.objects.all().order_by('image')
    output = ''
    folder = ''
    count = 0
    for r in rset:
        if r.image.name != '':
            current_folder = r.image.name.split('/')[1]
            if current_folder != folder:
                print(count)
                folder = current_folder
                print(folder)
                count = 0
            output += r.image.name
            output += '\n'
            count += 1
    print(count)
    f = open('temp.txt', 'w')
    f.write(output)
    f.close()

def pre_assign_standards():

    t_ns = Tab.objects.get(name="Number Sense")
    t_g = Tab.objects.get(name="Geometry")
    t_sp = Tab.objects.get(name="Stats and Prob")
    t_at = Tab.objects.get(name="Algebraic Thinking")

    hsf_standards = Standard.objects.filter(grade='hsf')
    hsn_standards = Standard.objects.filter(grade='hsn')
    hsg_standards = Standard.objects.filter(grade='hsg')
    hsa_standards = Standard.objects.filter(grade='hsa')
    hss_standards = Standard.objects.filter(grade='hss')

    rset = Resource.objects.all()
    for r in rset:
        if r.tab == t_ns:
            if r.grade_high > 8:
                for standard in hsf_standards:
                    standard.resources.add(r)
                    standard.save()
                for standard in hsn_standards:
                    standard.resources.add(r)
                    standard.save()
            for i in range(9):
                if r.grade_low <= i and r.grade_high >= i:
                    standards = Standard.objects.filter(grade=str(i)).filter(Q(category='cc') | Q(category='nbt') | Q(category='nf') | Q(category='rp') | Q(category='ns') | Q(category='f'))
                    for standard in standards:
                        standard.resources.add(r)
                        standard.save()
        elif r.tab == t_g:
            if r.grade_high > 8:
                for standard in hsg_standards:
                    standard.resources.add(r)
                    standard.save()
            for i in range(9):
                if r.grade_low <= i and r.grade_high >= i:
                    standards = Standard.objects.filter(grade=str(i), category='g')
                    for standard in standards:
                        standard.resources.add(r)
                        standard.save()
        elif r.tab == t_sp:
            if r.grade_high > 8:
                for standard in hss_standards:
                    standard.resources.add(r)
                    standard.save()
            for i in range(9):
                if r.grade_low <= i and r.grade_high >= i:
                    standards = Standard.objects.filter(grade=str(i)).filter(Q(category='md') | Q(category='sp'))
                    for standard in standards:
                        standard.resources.add(r)
                        standard.save()
        elif r.tab == t_at:
            if r.grade_high > 8:
                for standard in hsa_standards:
                    standard.resources.add(r)
                    standard.save()
            for i in range(9):
                if r.grade_low <= i and r.grade_high >= i:
                    standards = Standard.objects.filter(grade=str(i)).filter(Q(category='oa') | Q(category='ee'))
                    for standard in standards:
                        standard.resources.add(r)
                        standard.save()
        print(r.name)

def fidelity_check():
    for r in Resource.objects.all():
        group_name = r.group_name
        lastlength = r.length
        groupset = Resource.objects.filter(group_name=group_name)
        for g in groupset:
            if g.length != lastlength:
                print(g.name)
            lastlength = g.length
