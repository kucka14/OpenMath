from .models import Tab, Resource, Standard, SaveList
import json
import time

def convert_grade(grade_int):
    grade_string = str(grade_int)
    if grade_int == 0:
        grade_string = 'K'
    return grade_string

def make_grade_display(grade_low, grade_high):
    grade_low = convert_grade(grade_low)
    grade_high = convert_grade(grade_high)
    grade_display = grade_low
    if grade_low != grade_high:
        grade_display = str(grade_low) + '-' + str(grade_high)
    return grade_display

def make_standards(resource):
    couplet_list = []
    standards_list = []
    standards_string = []
    for standard in resource.standard_set.all().order_by('label'):
        partial_list = standard.label.split('.')
        standards_list.append(partial_list)
        partial_string = standard.label
        standards_string.append(partial_string)
        couplet_list.append([partial_string, standard.description])
    standards_list = json.dumps(standards_list)
    standards_string = ', '.join(standards_string)
    return standards_list, standards_string, couplet_list

def get_word(name):
    return name.split('#')[0] + '#'

def get_number(name):
    split_list = name.split('#')
    if len(split_list) == 2:
        return int(split_list[1])
    else:
        return ''

def make_resource_list(preresources, hide_email=True):

    resources = sorted(preresources, key=lambda i: (i.group_name, get_word(i.name), get_number(i.name)))
    resource_list = []
    half_couplet_list = []
    for resource in resources:
        if resource.image == '':
            image_url = ''
        else:
            image_url = resource.image.url
            if '?' in image_url:
                image_url = image_url.split('?')[0]
        grade_display = make_grade_display(resource.grade_low, resource.grade_high)
        standards_list, standards_string, couplet_list = make_standards(resource)
        half_couplet_list += couplet_list
        if hide_email:
            email = 'hide_email'
            tab_name = resource.tab.name
            tab_id = resource.tab.id
        else:
            email = resource.email
            tab_name = ''
            tab_id = ''
        tag_list = [t.name for t in resource.tag_set.all()]
        tag_string = ', '.join(tag_list)

        if resource.length == 1:
            category_name = 'Quick Puzzle'
            category_color = '#7ea0a6'
        elif resource.length == 2:
            category_name = 'Lesson Activity'
            category_color = '#3e737d'
        elif resource.length == 3:
            category_name = 'Extended Challenge'
            category_color = '#074750'
            
        resource_info = {
                    'id': resource.id,
                    'name': resource.name,
                    'description': resource.description,
                    'question': resource.question,
                    'image_url': image_url,
                    'link': resource.link,
                    'email': email,
                    'grade_low': resource.grade_low,
                    'grade_high': resource.grade_high,
                    'grade_display': grade_display,
                    'group_name': resource.group_name,
                    'standards_list': standards_list,
                    'standards_string': standards_string,
                    'category_name': category_name,
                    'category_color': category_color,
                    'length': resource.length,
                    'tab_name': tab_name,
                    'tab_id': tab_id,
                    'tag_string': tag_string
                }
        resource_list.append(resource_info)
    return resource_list, half_couplet_list

def merge_tablist(tablist):
    fulllist = []
    for tab in tablist:
        fulllist += tab[1]
    fulllist = sorted(fulllist, key=lambda i: (len(i['category_name']), i['group_name'], get_word(i['name']), get_number(i['name'])))
    return fulllist

def make_couplet_dict(couplet_list):
    couplet_dict = {}
    for couplet in couplet_list:
        couplet_dict[couplet[0]] = couplet[1]
    return couplet_dict

def load_standards_string(standards_string, resource, debug=False):

    prestandards_list = standards_string.split(',')
    standards_list = []
    for prestandard in prestandards_list:
        prestandard = prestandard.strip()
        if prestandard != '':
            standard = prestandard.lower()
            test_standard = standard.split('.')
            error = False
            for item in test_standard:
                if item.strip() == '' or '\u200b' in item:
                    error = True
                    break
            if len(test_standard) != 4:
                error = True
            if error:
                if debug:
                    print('Error with ' + resource.name)
                else:
                    raise
            else:
                standards_list.append(standard)

    existing_standard_list = []
    for standard in standards_list:
        standard_query = Standard.objects.filter(label=standard)
        if len(standard_query) == 0:
            if debug:
                print('Error with ' + standard)
        elif len(standard_query) == 1:
            existing_standard = standard_query[0]
            existing_standard_list.append(existing_standard)
            if resource not in existing_standard.resources.all():
                existing_standard.resources.add(resource)
                existing_standard.save()
    for standard in resource.standard_set.all():
        if standard not in existing_standard_list:
            standard.resources.remove(resource)
    if debug:
        print('Standards added')

def get_lists(logged_in):
    if logged_in:
        full_couplet_list = []
        tabs = Tab.objects.filter(in_trash=False, hidden=False).order_by('index')
        tablist = []
        personaltablist = []
        for tab in tabs:
            resources = tab.resource_set.filter(in_trash=False, hidden=False)
            resource_list, half_couplet_list = make_resource_list(resources)
            full_couplet_list += half_couplet_list
            tabbed_resource_list = [[tab.id,tab.index,tab.name], resource_list]
            if tab.index >= 100:
                personaltablist.append(tabbed_resource_list)
            else:
                tablist.append(tabbed_resource_list)
        fulllist = merge_tablist(tablist)
        if logged_in:
            untablist, couplet_list = make_resource_list(Resource.objects.filter(tab__isnull=True, in_trash=False, hidden=False), hide_email=False)
        else:
            untablist = []

        savelist = SaveList.objects.get(id=1)
        json_tablist = json.dumps(tablist)
        savelist.tablist = json_tablist
        json_fulllist = json.dumps(fulllist)
        savelist.fulllist = json_fulllist
        json_full_couplet_list = json.dumps(full_couplet_list)
        savelist.full_couplet_list = json_full_couplet_list
        savelist.save()

    else:
        personaltablist = []
        untablist = []
        savelist = SaveList.objects.get(id=1)
        tablist = json.loads(savelist.tablist)
        fulllist = json.loads(savelist.fulllist)
        full_couplet_list = json.loads(savelist.full_couplet_list)

    return tablist, personaltablist, fulllist, untablist, full_couplet_list

def pre_assign_standards(r):

    for standard in r.standard_set.all():
        standard.resources.remove(r)

    t_ns = Tab.objects.get(name="Number Sense")
    t_g = Tab.objects.get(name="Geometry")
    t_sp = Tab.objects.get(name="Stats and Prob")
    t_at = Tab.objects.get(name="Algebraic Thinking")

    hsf_standards = Standard.objects.filter(grade='hsf')
    hsn_standards = Standard.objects.filter(grade='hsn')
    hsg_standards = Standard.objects.filter(grade='hsg')
    hsa_standards = Standard.objects.filter(grade='hsa')
    hss_standards = Standard.objects.filter(grade='hss')

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
