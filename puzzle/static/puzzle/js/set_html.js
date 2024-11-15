
function protect(item) {
    item = JSON.stringify(item);
    item = item.replace(/'/g, '&#39;');
    item = item.replace(/</g, '&lt;');
    item = item.replace(/>/g, '&gt;');
    item = JSON.parse(item);
    return item;
}

function makeResourceBoxLarge(loggedIn, resource) {
    let resourceBox = '';
    resourceBox += `
        <div class='resource-box-large'>
            <div class='resource-header' style='height: auto;'>
                <div>${protect(resource.name)}</div>
            </div>
            <div class='resource-content-large' style='height: auto;'>
                <div class='standards-section-large'><strong>(${protect(resource.grade_display)})</strong> ${resource.tag_string}</div>
                <div class='description-section-large'>${protect(resource.description)}</div>
                <div class='box-middle-section' style='height: auto;'>
    `;
    if (resource.question === '') {
        resourceBox += `
            <img src='${protect(resource.image_url)}' width='100%' height='100%'>
        `;
    } else {
        resourceBox += `
            <div class='question-section-large'>${protect(resource.question)}</div>
        `;
        if (loggedIn && resource.image_url !== '') {
            resourceBox += `
                <img src='${protect(resource.image_url)}' width='100%' height='100%'>
            `;
        }
    }
    resourceBox += `
        </div>
        <div class='source-section' style='height: auto; overflow-wrap: break-word;'>
    `;
    if (resource.link.slice(0, 4) === 'http') {
        resourceBox += `
            Source: <a href='${protect(resource.link)}' target='_blank'>${protect(resource.link)}</a>
        `;
    } else {
        resourceBox += `
            Source: ${protect(resource.link)}
        `;
    }
    resourceBox += `
            </div>
        </div>
    `;
    if (loggedIn && resource.email !== 'hide_email') {
        resourceBox += `
            <div class='email-section'>Return Email: ${protect(resource.email)}</div>
        `;
    }
    resourceBox += `
        </div>
    `;
    return resourceBox;
}

function makePopModal(loggedIn, resource) {
    const popModal = `
        <button style='display: none;' id='resource-pop-button-${protect(resource.id)}' type='button' data-bs-toggle='modal' data-bs-target='#resource-pop-modal-${protect(resource.id)}'></button>
        <div style='z-index: 10000;' class='modal fade' id='resource-pop-modal-${protect(resource.id)}' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1'>
            <div class='modal-dialog'>
                <div class='modal-content modal-box'>
                    <div>${makeResourceBoxLarge(loggedIn, resource)}</div>
                    <div class='modal-line' style='width: 100%; justify-content: center;'>
                        <button class="btn btn-primary standard-button" type='button' data-bs-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return popModal;
}

function makeResourceBoxSmall(loggedIn, resource) {
    let resourceBox = '';
    resourceBox += `
        <div class='resource-header'>
            <div id='resource-header-line' class='ellipsis-line'>${protect(resource.name)}</div>
        </div>
        <div class='resource-container'>
            <div class='resource-label' style='background-color: ${protect(resource.category_color)}'><p>${protect(resource.category_name)}</p></div>
            <div class='resource-content'>
                <div class='ellipsis-line standards-section'><strong>(${protect(resource.grade_display)})</strong> ${protect(resource.tag_string)}</div>
                <div class='description-section'>${protect(resource.description)}</div>
                <div class='box-middle-section'>
    `;
    if (resource.question === '') {
        resourceBox += `
            <img src='${protect(resource.image_url)}' width='100%' height='100%'>
        `;
    } else {
        resourceBox += `
            <div class='question-section'>${protect(resource.question)}</div>
        `;
        if (loggedIn && resource.image_url !== '') {
            resourceBox += `
                <img src='${protect(resource.image_url)}' width='100%' height='100%'>
            `;
        }
    }
    resourceBox += `
        </div>
        <div class='ellipsis-line source-section'>
    `;
    if (resource.link.slice(0, 4) === 'http') {
        resourceBox += `
            Source: ${protect(resource.link)}
        `;
    } else {
        resourceBox += `
            Source: ${protect(resource.link)}
        `;
    }
    resourceBox += `
                </div>
            </div>
        </div>
    `;
    if (loggedIn) {
        if (resource.email !== 'hide_email') {
            resourceBox += `
                <div class='email-section'><strong>Return Email:</strong> ${protect(resource.email)}</div>
            `;
        }
        resourceBox += `
            <div style='display: block;' class='resource-footer switch-show'>
                <button class='edit-resource-button' type='button' data-rid='${protect(resource.id)}' data-name='${protect(resource.name)}' data-description='${protect(resource.description)}' data-question='${protect(resource.question)}' data-link='${protect(resource.link)}' data-glow='${protect(resource.grade_low)}' data-ghigh='${protect(resource.grade_high)}' data-groupname='${protect(resource.group_name)}' data-standards-string='${protect(resource.standards_string)}' data-categoryname='${protect(resource.category_name)}' data-length='${protect(resource.length)}' data-tname='${protect(resource.tab_name)}' data-tid='${protect(resource.tab_id)}'  data-bs-toggle='modal' data-bs-target='#edit-resource-modal'>Edit</button>
                <button class='delete-resource-button' type='button' data-rid='${protect(resource.id)}' data-bs-toggle='modal' data-bs-target='#delete-modal'>Delete</button>
            </div>
        `;
    }
    return resourceBox;
}

function makeTabPane(loggedIn, tab) {
    let tabPane = '';
    tabPane += `
        <div class='tab-content'>
            <div class='tab-pane fade' id='tab-${protect(tab[0][0])}-content'>
                <div class='tab-box'>
    `;
    for (const resource of tab[1]) {
        tabPane += `
            <div id='resource-box-${protect(resource.id)}' class='resource-box box-sliders' data-rid='${protect(resource.id)}' data-glow='${protect(resource.grade_low)}' data-ghigh='${protect(resource.grade_high)}' data-groupname='${protect(resource.group_name)}'>
                ${makeResourceBoxSmall(loggedIn, resource)}
            </div>
        `;
    }
    tabPane += `
                </div>
            </div>
        </div>
    `;
    return tabPane;
}

function makeEditResourceModal(tablist, personaltablist) {
    let editModal = '';
    editModal += `
        <div style='z-index: 10000;' class='modal fade' id='edit-resource-modal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1'>
            <div class='modal-dialog'>
                <div class='modal-content modal-box'>
                    <form id='edit-resource-form' method='post' class='standard-form'>
                        <input type='hidden' name='type' value='edit_resource'>
                        <input type='hidden' id='erhiddenrid' name='erhiddenrid'>
                        <input type='hidden' id='erhiddentid' name='erhiddentid'>
                        <div class='form-item'>
                            Parent Tab:
                            <select id='select-menu-edit'>
    `;
    for (const tab of tablist) {
        editModal += `
            <option value='${protect(tab[0][0])}'>${protect(tab[0][2])}</option>
        `;
    }
    for (const tab of personaltablist) {
        editModal += `
            <option value='${protect(tab[0][0])}'>${protect(tab[0][2])}</option>
        `;
    }
    editModal += `
                                </select>
                        </div>
                        <div class='form-item'>Resource Name: <input type='text' name='ername' id='ername'></div>
                        <div class='form-item'>Implementation Tips: <textarea type='text' name='erdescription' id='erdescription'></textarea></div>
                        <div style='display: none;' id='question-edit-div'>
                            <div class='form-item'>Resource Question: <textarea name='erquestion' id='erquestion'></textarea></div>
                        </div>
                        <div class='form-item'>Resource Link/Creator: <input type='text' name='erlink' id='erlink'></div>
                        <div class='form-item'>Low Grade Level: <input type='text' name='ergradelow' id='ergradelow'></div>
                        <div class='form-item'>High Grade Level: <input type='text' name='ergradehigh' id='ergradehigh'></div>
                        <div class='form-item'>Group Name: <input type='text' name='ergroupname' id='ergroupname'></div>
                        <div class='form-item'>Standards: <textarea type='text' name='erstandards' id='erstandards'></textarea></div>
                        <div class='form-item'>Length: <input type='text' name='erlength' id='erlength'></div>
                    <div class='modal-line' style='width: 100%;'>
                        <input type='submit' value='Submit' name='edit_resource_submit'>
                    </form>
                    <button id='edit-resource-dismiss' type='button' data-bs-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return editModal;
}

function makeReviewSubmissionsModal(loggedIn, untablist) {
    let reviewModal = '';
    reviewModal += `
        <div class='modal fade' id='review-submission-modal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1'>
            <div class='modal-dialog'>
                <div class='modal-content modal-box'>
                    <div class='modal-line'>
                        <div>Submissions</div>
                        <button type='button' class='btn-close' data-bs-dismiss='modal'></button>
                    </div>
                    <div id='review-box' class='modal-body'>
    `;
    if (untablist.length === 0) {
        reviewModal += `
            <div>There are no unreviewed submissions.</div>
        `;
    } else {
        for (const resource of untablist) {
            reviewModal += `
                <div id='resource-box-${protect(resource.id)}' class='resource-box box-sliders' data-rid='${protect(resource.id)}' data-glow='${protect(resource.grade_low)}' data-ghigh='${protect(resource.grade_high)}' data-groupname='${protect(resource.group_name)}'>
                    ${makeResourceBoxSmall(loggedIn, resource)}
                </div>
            `;
        }
    }
    reviewModal += `
                    </div>
                    <div class='modal-line' style='justify-content: center; width: 100%;'>
                        <button type='button' data-bs-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return reviewModal;
}

function makeContentHtml(loggedIn, tablist, personaltablist, fulllist) {
    let contentHtml = '';
    contentHtml += `<ul class='nav nav-tabs'>`;
    for (const tab of tablist) {
        contentHtml += `
            <li class='nav-item'>
                <button class='nav-link' id='tab-${protect(tab[0][0])}' data-tid='${protect(tab[0][0])}' data-index='${protect(tab[0][1])}' data-name='${protect(tab[0][2])}'>${protect(tab[0][2])}</button>
            </li>
        `;
    }
    contentHtml += `
        <li class='nav-item'>
            <button class='nav-link' id='tab-standards'>By Standard</button>
        </li>
    `;
    if (loggedIn) {
        for (const tab of personaltablist) {
            contentHtml += `
                <div style='display: block;' class='switch-show'>
                    <li class='nav-item'>
                        <button class='nav-link' id='tab-${protect(tab[0][0])}' data-tid='${protect(tab[0][0])}' data-index='${protect(tab[0][1])}' data-name='${protect(tab[0][2])}'>${protect(tab[0][2])}</button>
                    </li>
                </div>
            `;
        }
    }
    contentHtml += `
        </ul>
        <div id='slider-div' style='margin-left: 15px; margin-right: 15px;'>
            <div style='margin-top: 5px; margin-bottom: 5px;'>
                <label for='grade'>Grade Range:</label>
                <input type='text' id='grade' readonly>
            </div>
            <div id='slider-range'></div>
        </div>
    `;
    for (const tab of tablist) {
        contentHtml += makeTabPane(loggedIn, tab);
    }
    contentHtml += `
        <div class='tab-content'>
            <div class='tab-pane fade' id='tab-standards-content'>
                <div id='standards-container'>
                    <div id='standard-select-div'>
                        Common Core Math (CCSS):
                        <select id='grade-select' class='standard-select'>
                            <option value='all'>All</option>
                        </select>
                        <select id='category-select' class='standard-select'>
                            <option value='all'>All</option>
                        </select>
                        <select id='letter-select' class='standard-select'>
                            <option value='all'>All</option>
                        </select>
                        <select id='number-select' class='standard-select'>
                            <option value='all'>All</option>
                        </select>
                    </div>
                    <div style='display: none;' id='standard-description-div'></div>
                </div>
                <div class='tab-box'>
    `;
    for (const resource of fulllist) {
        contentHtml += `
            <div id='resource-box-standards-${protect(resource.id)}' class='resource-box box-standards' data-rid='${protect(resource.id)}' data-glow='${protect(resource.grade_low)}' data-ghigh='${protect(resource.grade_high)}' data-groupname='${protect(resource.group_name)}' data-standards='${protect(resource.standards_list)}'>
                ${makeResourceBoxSmall(loggedIn, resource)}
            </div>
        `;
    }
    contentHtml += `
                </div>
            </div>
        </div>
    `;
    if (loggedIn) {
        for (const tab of personaltablist) {
            contentHtml += makeTabPane(loggedIn, tab);
        }
    }
    return contentHtml;
}

function makeLowerHtml(loggedIn, tablist, personaltablist, untablist) {
    let lowerHtml = '';
    for (const tab of tablist) {
        for (const resource of tab[1]) {
            lowerHtml += makePopModal(loggedIn, resource);
        }
    }
    if (loggedIn) {
        for (const tab of personaltablist) {
            for (const resource of tab[1]) {
                lowerHtml += makePopModal(loggedIn, resource);
            }
        }
        for (const resource of untablist) {
            lowerHtml += makePopModal(loggedIn, resource);
        }
        lowerHtml += makeEditResourceModal(tablist, personaltablist);
        lowerHtml += makeReviewSubmissionsModal(loggedIn, untablist);
    }
    return lowerHtml;
}
