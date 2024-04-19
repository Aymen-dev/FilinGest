<?php

namespace App\Http\Requests\V2;

use Illuminate\Foundation\Http\FormRequest;

class UpdatemachineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $method=$this->method();
        if($method=='PUT'){
            return [
                '.reference'=>['required'],
                '.etat_machine'=>['required'],
                '.nom_machine'=>['required'],
                '.caract_numerique'=>['required'],
                '.modele'=>['required'],
                '.marque'=>['required'],
                '.departement'=>['required'],
                '.systeme'=>['required'],
                '.pds_vase'=>['required'],
            ];
        }else{
            return [
                '.reference'=>['sometimes','required'],
                '.etat_machine'=>['sometimes','required'],
                '.nom_machine'=>['sometimes','required'],
                '.caract_numerique'=>['sometimes','required'],
                '.modele'=>['sometimes','required'],
                '.marque'=>['sometimes','required'],
                '.departement'=>['sometimes','required'],
                '.systeme'=>['sometimes','required'],
                '.pds_vase'=>['sometimes','required'],
            ]; 
        }
        
    }
}
