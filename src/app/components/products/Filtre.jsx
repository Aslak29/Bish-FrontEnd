import React, {useEffect, useState} from "react";
import Slider from "@material-ui/core/Slider";
import {withStyles} from "@material-ui/core";
import cross from "../../assets/images/cross.png";
import apiBackend from "@/app/api/backend/api.Backend";
import {URL_BACK_SIZE} from "@/app/constants/urls/urlBackEnd";

const CustomSlider = withStyles({
    root: {
        color: "#2EB7EB",
        height: 12,
        padding: "13px 0",
    },
    rail: {
        height: 12,
        color: "#2EB7EB",
    },
    thumb: {
        height: 24,
        width: 24,
        marginTop: -6,
    },
    track: {
        color: "#0d5aa7",
    },
})(Slider);

const marks = [
    {
        value: 0,
        label: "0€",
    },
    {
        value: 1000,
        label: "1000€",
    },
];

const CheckBox = ({label, typeCheck, name, onChange, value, checked}) => {



    return (
        <>
            <input
                className="w-6 h-6 rounded-full"
                type={typeCheck}
                name={name}
                onChange={onChange}
                defaultChecked={checked && true}
                value={value}
            />
            <label className="ml-3">{label}</label>
        </>
    );
};

const Filtre = (props) => {
    const [checkedAsc, setCheckedAsc] = React.useState(false);
    const [checkedDesc, setCheckedDesc] = React.useState(false);
    const [checkedNote, setCheckedNote] = React.useState(false);
    const [size, setSize] = useState([]);
    const [sizeChecked, setSizeChecked] = React.useState([]);
    const [value, setValue] = React.useState([0, 20]);
    let timer;

    useEffect(() => {
        apiBackend.get(URL_BACK_SIZE).then((res) => {
            setSize(res.data)
        })
        props.size(sizeChecked)
    }, [sizeChecked])

    const rangeSelectorOld = (event, newValue) => {
        setValue(newValue)
    }

    const rangeSelector = (event, newValue) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            props.priceRangeFilter(newValue);
        }, 1000);
    };

    const handleChangeAscDesc = () => {
        setCheckedAsc(false)
        setCheckedDesc(false)
        if (props.filter !== null){
            props.filter(null, false);
        }
    }

    const handleChangeAsc = () => {
        setCheckedAsc(!checkedAsc);
        setCheckedDesc(false);
        if (checkedNote) {
            props.filter("ASC", true);
        } else {
            props.filter("ASC", false);
        }
    };

    const handleChangeDesc = () => {
        setCheckedDesc(!checkedDesc);
        setCheckedAsc(false);
        if (checkedNote) {
            props.filter("DESC", true);
        } else {
            props.filter("DESC", false);
        }
    };

    const handleChangeNote = () => {
        setCheckedNote(!checkedNote);
        if (document.getElementsByName("orderByNote")[0].checked) {
            if (checkedAsc) {
                props.filter("ASC", true);
            } else if (checkedDesc) {
                props.filter("DESC", true);
            } else {
                props.filter(null, true);
            }
        } else {
            if (checkedAsc) {
                props.filter("ASC", false);
            } else if (checkedDesc) {
                props.filter("DESC", false);
            } else {
                props.filter(null, false);
            }
        }
    };

    const handleChangeSize = (taille) => {
        /*props.setSize(event.target.value)*/
        const check = document.getElementById("sizeCheck" + taille).checked
        if (check) {
            setSizeChecked(current => [...current, taille])
        } else {
            setSizeChecked(current => [...current.filter(res => res !== taille)])
        }
    }

    return (
        <div className="mt-24">
            <img
                src={cross}
                onClick={props.closeFilter}
                className="w-7 cursor-pointer absolute top-16 right-3"
                alt="cross"
            />
            <p className="bish-text-gray text-3xl mb-3">Trier par</p>
            <ul className="flex flex-col space-y-3">
                <li>
                    <input
                        className="w-6 h-6 rounded-full"
                        type="radio"
                        name="orderByPrice"
                        onChange={() => handleChangeAscDesc()}
                        defaultChecked={true}
                    />
                    <label className="ml-3">Aucun ordre</label>
                </li>
                <li>
                    <CheckBox
                        label="Prix: par ordre croissant"
                        typeCheck="radio"
                        onChange={() => handleChangeAsc()}
                        value={checkedAsc}
                        name="orderByPrice"
                    />
                </li>
                <li>
                    <CheckBox
                        label="Prix: par ordre décroissant"
                        typeCheck="radio"
                        value={checkedDesc}
                        onChange={() => handleChangeDesc()}
                        name="orderByPrice"
                    />
                </li>
                {/* <li>
          <CheckBox
            label="Note moyenne"
            typeCheck="checkbox"
            value={checkedNote}
            onChange={() => handleChangeNote()}
            name="orderByNote"
          />
        </li> */}
            </ul>

            <div className="">
                <p className="bish-text-gray text-3xl my-3">Filtre par</p>
                <div className="flex justify-center">
          <span className="mr-3 whitespace-nowrap mt-1 bish-text-gray">
            Prix :{" "}
          </span>
                    <CustomSlider
                        value={value}
                        step={10}
                        min={0}
                        max={1000}
                        onChange={rangeSelectorOld}
                        onChangeCommitted={rangeSelector}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <span className="mr-3 whitespace-nowrap mt-1 bish-text-gray">Tailles disponibles:</span>

                    <div className="w-full flex justify-center flex-wrap my-4 gap-2 ">
                        {size.map((r) =>
                                <div key={r.taille}
                                     className="relative group w-1/5 checked:bish-bg-white rounded font-medium box-border h-8 text-center bish-bg-blue bish-text-white hover:bish-bg-white hover:bish-outline-gray hover:text-black">
                                    <input
                                        type="checkbox"
                                        id={`sizeCheck${r.taille}`}
                                        name="sizeCheck"
                                        className="peer w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer inputSize"
                                        onChange={() => handleChangeSize(r.taille)}
                                    />
                                    <div className="rounded w-full h-full flex items-center justify-center transition-all">
                    <span>
                      {r.taille.toUpperCase()}
                    </span>
                                    </div>
                                </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filtre;
