import { Quill } from 'react-quill';
import * as Emoji from "quill-emoji";
import 'react-quill/dist/quill.snow.css';
import "quill-emoji/dist/quill-emoji.css";

Quill.register("modules/emoji", Emoji);
var FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = [
  'arial','caveat','dancing-script',
  'lobster','monospace','pacifico',
  'passions-conflict','permanent-marker',
  'playfair-display','poppins', 'roboto',  
  'sans-serif', 'satisfy'
];
Quill.register(FontAttributor, true);

export const toolbarOptions= {
        container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [  
                'arial','caveat','dancing-script',
                'lobster','monospace','pacifico',
                'passions-conflict','permanent-marker',
                'playfair-display','poppins', 'roboto',  
                'sans-serif', 'satisfy']}],
            ["bold", "italic", "underline", "strike", "blockquote", "link"],
            [ { 'color': [
                '#000000', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 
                '#444444', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', 
                '#888888', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', 
                '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', 
                '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', 
                'color-picker'] }, 
            { 'background': [
                '#000000', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 
                '#444444', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', 
                '#888888', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', 
                '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', 
                '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', 
                'background-color-picker'] }], 
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ 'align': [] }],
            ["emoji"],
            ["clean"]
        ],
        handlers: {
            'emoji': function() {},
            'color': function (value) {
                if (value === 'color-picker') {
                    var picker = document.getElementById('color-picker');
                    if (!picker) {
                      picker = document.createElement('input');
                      picker.id = 'color-picker';
                      picker.type = 'color';
                      picker.style.display = 'none';
                      picker.value = '#FF0000';
                      document.body.appendChild(picker);
                      picker.addEventListener('change', ()=> {
                        console.log(this.quill);
                        this.quill.format('color', picker.value);
                      });
                    }
                    picker.click(); 
                } else {
                    this.quill.format('color', value);
                }
            },
            'background': function (value) {
                if (value === 'background-color-picker') {
                    var picker = document.getElementById('background-color-picker');
                    if (!picker) {
                      picker = document.createElement('input');
                      picker.id = 'color-picker';
                      picker.type = 'color';
                      picker.style.display = 'none';
                      picker.value = '#FF0000';
                      document.body.appendChild(picker);
                      picker.addEventListener('change', ()=> {
                        console.log(this.quill);
                        this.quill.format('background', picker.value);
                      });
                    }
                    picker.click(); 
                } else {
                    this.quill.format('background', value);
                }
            }
        }
    }
