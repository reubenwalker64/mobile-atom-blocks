const { __, setLocaleData } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;
const {
	RichText,
	MediaUpload,
} = wp.editor;
const { Button } = wp.components;

registerBlockType( 'gutenberg-examples/example-05-recipe-card-esnext', {
	title: __( 'Tutorial Card (esnext)', 'gutenberg-examples' ),
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
					placeholder={ __( 'Write Tutorial title…', 'gutenberg-examples' ) }
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
								{ ! mediaID ? __( 'Upload Image', 'gutenberg-examples' ) : <img src={ mediaURL } alt={ __( 'Upload Tutorial Image', 'gutenberg-examples' ) } /> }
							</Button>
						) }
					/>
				</div>
				<h3>{ __( 'Sections', 'gutenberg-examples' ) }</h3>
				<RichText
					tagName="ul"
					multiline="li"
					placeholder={ __( 'Write a list of sections…', 'gutenberg-examples' ) }
					value={ sections }
					onChange={ onChangeSections }
					className="sections"
				/>
				<h3>{ __( 'Instructions', 'gutenberg-examples' ) }</h3>
				<RichText
					tagName="div"
					multiline="p"
					className="steps"
					placeholder={ __( 'Write the instructions…', 'gutenberg-examples' ) }
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
						<img className="tutorial-image" src={ mediaURL } alt={ __( 'Tutorial Image', 'gutenberg-examples' ) } />
					)
				}

				<RichText.Content tagName="h2" className="sections" value={ sections } />

				<RichText.Content tagName="div" className="steps" value={ instructions } />
			</div>
		);
	},
} );
