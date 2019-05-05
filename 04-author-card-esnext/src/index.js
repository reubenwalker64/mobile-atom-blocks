const { __, setLocaleData } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	RichText,
	MediaUpload,
} = wp.editor;
const { Button } = wp.components;

registerBlockType( 'mobile-atom-blocks/example-04-author-card-esnext', {
	title: __( 'Author Card (esnext)', 'mobile-atom-blocks' ),
	icon: 'user',
	category: 'layout',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		credentials: {
			type: 'array',
			source: 'children',
			selector: '.credentials',
		},
		bio: {
			type: 'array',
			source: 'children',
			selector: '.steps',
		},
	},
	edit: ( props ) => {
		const {
			className,
			attributes: {
				title,
				mediaID,
				mediaURL,
				credentials,
				bio,
			},
			setAttributes,
		} = props;
		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		};

		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeCredentials = ( value ) => {
			setAttributes( { credentials: value } );
		};

		const onChangeBio = ( value ) => {
			setAttributes( { bio: value } );
		};

		return (
			<div className={ className }>
				<RichText
					tagName="h2"
					placeholder={ __( 'Write Author name…', 'mobile-atom-blocks' ) }
					value={ title }
					onChange={ onChangeTitle }
				/>
				<div className="author-image">
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes="image"
						value={ mediaID }
						render={ ( { open } ) => (
							<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
								{ ! mediaID ? __( 'Upload Image', 'mobile-atom-blocks' ) : <img src={ mediaURL } alt={ __( 'Upload Author Image', 'mobile-atom-blocks' ) } /> }
							</Button>
						) }
					/>
				</div>
				<h3>{ __( 'Credentials', 'mobile-atom-blocks' ) }</h3>
				<RichText
					tagName="ul"
					multiline="li"
					placeholder={ __( 'Write a list of credentials…', 'mobile-atom-blocks' ) }
					value={ credentials }
					onChange={ onChangeCredentials }
					className="credentials"
				/>
				<h3>{ __( 'Bio', 'mobile-atom-blocks' ) }</h3>
				<RichText
					tagName="div"
					multiline="p"
					className="steps"
					placeholder={ __( 'Write the bio…', 'mobile-atom-blocks' ) }
					value={ bio }
					onChange={ onChangeBio }
				/>
			</div>
		);
	},
	save: ( props ) => {
		const {
			className,
			attributes: {
				title,
				mediaURL,
				credentials,
				bio,
			},
		} = props;
		return (
			<div className={ className }>
				<RichText.Content tagName="h2" value={ title } />

				{
					mediaURL && (
						<img className="author-image" src={ mediaURL } alt={ __( 'author Image', 'mobile-atom-blocks' ) } />
					)
				}

				<RichText.Content tagName="h2" className="credentials" value={ credentials } />

				<RichText.Content tagName="div" className="steps" value={ bio } />
			</div>
		);
	},
} );
