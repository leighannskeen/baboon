$(document).ready(function() {
    ConfigureAsset = {
        configureField: function ($this, $assetPath) {
            $.fancybox({
                type: 'ajax',
                href: Routing.generate('bb_panel_field_configure', {
                    assetPath: $assetPath
                }),
                autoSize: false,
                width: '600px',
                maxWidth: '600px',
                height: 'auto',
                helpers: {
                    overlay: {
                        closeClick: false
                    }
                }
            });
        },
        saveAssetValue: function ($this, $assetPath) {
            var savePath = Routing.generate('bb_panel_field_save_asset_value');
            var value = $('#asset-data-wrap').val();
            $.post(savePath, {
                assetPath: $assetPath,
                value   : value
            }, function(data){
                if(data.success == true){
                    noty({
                        type: 'success',
                        text: 'Asset field value successfully updated!',
                        timeout: 2000
                    });
                    ConfigureAsset.loadAssetWrap($assetPath);
                    $.fancybox.close();
                }
            });
        },
        loadAssetWrap: function ($assetPath) {
            var wrapDiv = $('[data-path="'+$assetPath+'"]');
            var loadAssetPath = Routing.generate('bb_panel_get_asset_wrap', {
                'assetPath': $assetPath
            });
            $.get(loadAssetPath, function(data){
                wrapDiv.html(data);
                wrapDiv.find('.collapse').addClass('in');
            });
        },
        refreshImageValue: function ($assetPathId) {
            var $imageVal = $('#upload_image_image').val();
            if($imageVal == ''){
                return;
            }
            $('[data-path-id="'+$assetPathId+'"]').val($imageVal);
        },
        refreshFileValue: function ($assetPathId) {
            var $fileVal = $('#upload_file_file').val();
            if($fileVal == ''){
                return;
            }
            $('[data-path-id="'+$assetPathId+'"]').val($fileVal);
        },
        addItem: function ($this, $assetPath) {
            console.log($assetPath);
            var wrapDiv = $('[data-path="'+$assetPath+'"]').find('.panel-body:eq(0)');
            var loadAssetPath = Routing.generate('bb_panel_tree_add_item', {
                'assetPath': $assetPath
            });
            $.get(loadAssetPath, function(data){
                wrapDiv.append(data);
            });
        },
        deleteItem: function ($this, $assetPath, $itemKey) {
            console.log($assetPath);
            var deleteDiv = $('[data-path="'+$assetPath+'[assets]['+$itemKey+']"]');
            var deleteItemPath = Routing.generate('bb_panel_tree_delete_item', {
                'assetPath': $assetPath,
                'itemKey': $itemKey
            });
            $.get(deleteItemPath, function(data){
                deleteDiv.remove();
            });
        }
    };
});
