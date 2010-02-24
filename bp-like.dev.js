jQuery(document).ready( function() {
	jQuery('.like, .unlike').live('click', function() {
		
		var type = jQuery(this).attr('class');
		var id = jQuery(this).attr('id');
		
		jQuery(this).addClass('loading');
		
		jQuery.post( ajaxurl, {
			action: 'activity_like',
			'cookie': encodeURIComponent(document.cookie),
			'type': type,
			'id': id
		},
		function(data) {
			
			jQuery('#' + id).removeClass('loading');
			jQuery('#' + id).fadeOut( 100, function() {
				jQuery(this).html(data);
				jQuery(this).fadeIn(100);
			});

			if (type == 'like') {
				var newID = id.replace("like", "unlike");
				jQuery('#' + id).removeClass('like').addClass('unlike').attr('title', 'Unlike this item').attr('id', newID);
			} else {
				var newID = id.replace("unlike", "like");
				jQuery('#' + id).removeClass('unlike').addClass('like').attr('title', 'Like this item').attr('id', newID);
			}

		});
		
		return false;
	});

	jQuery('.view-likes').toggle(function() {
		
		var type = jQuery(this).attr('class');
		var id = jQuery(this).attr('id');
		var thisID = jQuery(this).attr('id');
		var parentID = thisID.replace("view-likes", "users-who-like");
		
		jQuery(this).addClass('loading');
		
		jQuery.post( ajaxurl, {
			action: 'activity_like',
			'cookie': encodeURIComponent(document.cookie),
			'type': type,
			'id': id
		},
		function(data) {

			jQuery('#' + thisID).html('Hide likes').removeClass('loading');
			jQuery('#' + parentID).html(data).fadeIn(100);

		});
		
		return false;

	}, function() {
		
		var thisID = jQuery(this).attr('id');
		var parentID = thisID.replace("view-likes", "users-who-like");
		
		jQuery(this).html('Show likes').removeClass('loading');
		jQuery('#' + parentID).fadeOut();
		
		return false;

	});

});