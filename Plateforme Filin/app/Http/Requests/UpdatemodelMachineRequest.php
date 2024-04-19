<?php

namespace App\Http\Requests\V2;

use Illuminate\Foundation\Http\FormRequest;

class UpdatemodelMachineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $method=$this->method();
        if($method== 'PUT'){
            return [
                'nom_modele'=>['required'],
                'code_modele'=>['required']
            ];
        }else{
            return [
                'nom_modele'=>['sometimes','required'],
                'code_modele'=>['sometimes','required']

            ];
        }
    }
}
