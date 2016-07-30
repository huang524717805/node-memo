require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'text': 'libs/text',
        'template': 'libs/template',
        'folderController': 'controllers/folder_controller',
        'noteListController': 'controllers/note_list_controller',
        'noteDetailController': 'controllers/note_detail_controller',
        'folderView': 'views/folder_view',
        'noteListView': 'views/note_list_view',
        'noteDetailView': 'views/note_detail_view',
        'note':'models/note',
        'noteFolder':'models/note_folder',
        'tplAllFolder':'tpl/all_folder.html',
        'tplAllNote':'tpl/all_note.html',
        'tplNoteDetail':'tpl/note_detail.html',
        'alert':'libs/alert/js/alert'
    }
})

require(['backbone', 'router'], function(B, router) {
    B.history.start();
})
