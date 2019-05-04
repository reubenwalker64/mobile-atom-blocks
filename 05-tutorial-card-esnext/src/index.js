const { __, setLocaleData } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	RichText,
	MediaUpload,
} = wp.editor;
const { Button } = wp.components;

registerBlockType( 'mobile-atom-blocks/example-05-tutorial-card-esnext', {
	title: __( 'Tutorial Card (esnext)', 'mobile-atom-blocks' ),
	icon: 'index-card',
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
		sections: {
			type: 'array',
			source: 'children',
			selector: '.sections',
		},
		instructions: {
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
				sections,
				instructions,
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
		const onChangeSections = ( value ) => {
			setAttributes( { sections: value } );
		};

		const onChangeInstructions = ( value ) => {
			setAttributes( { instructions: value } );
		};

		return (
			<div className={ className }>
				<RichText
					tagName="h2"
					placeholder={ __( 'Write Tutorial title…', 'mobile-atom-blocks' ) }
					value={ title }
					onChange={ onChangeTitle }
				/>
				<div className="tutorial-image">
					<MediaUpload
						onSelect={ onSelectImage }
						allowedTypes="image"
						value={ mediaID }
						render={ ( { open } ) => (
							<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
								{ ! mediaID ? __( 'Upload Image', 'mobile-atom-blocks' ) : <img src={ mediaURL } alt={ __( 'Upload Tutorial Image', 'mobile-atom-blocks' ) } /> }
							</Button>
						) }
					/>
				</div>
				<h3>{ __( 'Sections', 'mobile-atom-blocks' ) }</h3>
				<RichText
					tagName="ul"
					multiline="li"
					placeholder={ __( 'Write a list of sections…', 'mobile-atom-blocks' ) }
					value={ sections }
					onChange={ onChangeSections }
					className="sections"
				/>
				<h3>{ __( 'Instructions', 'mobile-atom-blocks' ) }</h3>
				<RichText
					tagName="div"
					multiline="p"
					className="steps"
					placeholder={ __( 'Write the instructions…', 'mobile-atom-blocks' ) }
					value={ instructions }
					onChange={ onChangeInstructions }
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
				sections,
				instructions,
			},
		} = props;
		return (
			<div className={ className }>
				<RichText.Content tagName="h2" value={ title } />

				{
					mediaURL && (
						<img className="tutorial-image" src={ mediaURL } alt={ __( 'Tutorial Image', 'mobile-atom-blocks' ) } />
					)
				}

				<RichText.Content tagName="h2" className="sections" value={ sections } />

				<RichText.Content tagName="div" className="steps" value={ instructions } />
			</div>
		);
	},
} );
