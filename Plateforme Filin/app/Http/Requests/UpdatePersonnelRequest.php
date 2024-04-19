<?php

namespace App\Http\Requests\V2;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validtion\Rule;


class UpdatePersonnelRequest extends FormRequest
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
                'nom_prenom'=>['required'],
                'role'=>['required'],
                'equipe'=>['required']

            ];
        }else{
            return [
                'nom_prenom'=>['sometimes','required'],
                'role'=>['sometimes','required'],
                'equipe'=>['sometimes','required']
            ];
        }
    }
}
