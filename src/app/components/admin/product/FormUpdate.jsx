import React from 'react'
import { Field, Form, Formik } from "formik";

const FormUpdate = props => {

    // Objet STOCK qui se créer dynamiquement pour utiliser dans les initialValues Formik UPDATE
    const stockWithSize = {}
    props.produit.stockBySize.map(resStock => stockWithSize[resStock.taille.toLowerCase()] = resStock.stock)

    // UPDATE élément dans la BDD
    const updateRow = (id, values) => {
        console.log(values);
    }

    // Preview de l'image dans input type file
    const showPreview = e => {
        if(e.target.files.length > 0){
          var src = URL.createObjectURL(e.target.files[0]);
          var preview = document.getElementById("img-preview");
          preview.src = src;
          preview.style.display = "block";
        }
    }

    return (
        <Formik
            initialValues={{
                name: props.produit.name,
                price: props.produit.price,
                description: props.produit.description,
                stockWithSize,
                categorie: props.produit.id_categorie,
                promotion: props.produit.promotion.id,
                trend: props.produit.is_trend,
                available: props.produit.is_available
            }}
            onSubmit={(values) => updateRow(props.produit.id, values)}
            >
            {formikProps =>
                <Form className="grid grid-cols-2 sm:grid-cols-4 gap-4">        
                    {/* Nom */}
                    <div className="flex flex-col h-20">
                    <span>Nom</span>
                    <Field className='h-full' type="text" name="name"/>
                    </div>
                    {/* Description */}
                    <div className="flex flex-col col-span-2 row-span-2">
                    <span>Description</span>
                    <Field className='h-full' as="textarea" type="text" name="description" required/>
                    </div>
                    {/* Preview de l'image */}
                    <div className="preview row-span-4 h-96 shadow-lg">
                    <img className='object-contain h-full w-full' id="img-preview" alt='Prévisualisation' src={window.location.origin + '/src/app/assets/images/products/' + props.produit.pathImage}/>
                    </div>
                    {/* Prix */}
                    <div className="flex flex-col h-20">
                    <span>Prix (en euros)</span>
                    <Field className='h-full' type="number" name="price"/>
                    </div>
                    {/* Stock */}
                    <div className="flex flex-row h-20">
                    {
                        props.produit.stockBySize.map(resStock => 
                        <div className="flex flex-col w-1/5 h-full" key={resStock.taille}>
                            <span>{resStock.taille.toUpperCase()}</span>
                            <Field className='h-full' type="number" name={'stockWithSize.' + resStock.taille.toLowerCase()} required/>
                        </div>
                    )}
                    </div>
                    {/* Catégorie */}
                    <div className="flex flex-col h-20">
                    <span>Catégorie</span>
                    <Field className='h-full' name="categorie" as="select">
                        <option value='-'>-</option>
                        {props.categories.data.map(resCateg => <option key={resCateg.id} value={resCateg.id}>{resCateg.name}</option>)}
                    </Field>
                    </div>
                    {/* Promotion */}
                    <div className="flex flex-col h-20">
                    <span>Promotion</span>
                    <Field className='h-full' name="promotion" as="select">
                        <option value='-'>-</option>
                        {props.promotions.data.map(resPromo => <option key={resPromo.id} value={resPromo.id}>{resPromo.remise} %</option>)}
                    </Field>
                    </div>
                    {/* Tendance et Visible */}
                    <div className="flex flex-row h-20 justify-around">
                    <div className="flex flex-col h-full justify-center align-items-center">
                        <span>Tendance</span>
                        <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox" name="trend"/>
                    </div>
                    <div className="flex flex-col h-full justify-center align-items-center">
                        <span>Visible</span>
                        <Field className='h-8 w-8 lg:h-10 lg:w-10 bish-text-blue m-auto' type="checkbox" name="available"/>
                    </div>      
                    </div>
                    <div></div>
                    {/* Image */}
                    <div className="flex flex-col h-20">
                    <span>Image</span>
                    <Field className='my-auto' accept="image/*" type="file" name="file" onChange={e => {showPreview(e); formikProps.setFieldValue('infoFile', e.currentTarget.files[0])}}/>
                    </div>
                    {/* Button Modifier */}
                    <button type="submit" className="bish-bg-blue py-3 w-full bish-text-white col-span-4 mx-auto">Modifier</button>
                </Form>
            }     
        </Formik>
    )
}

export default FormUpdate