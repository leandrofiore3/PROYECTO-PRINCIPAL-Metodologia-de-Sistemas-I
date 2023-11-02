//import { Request, Response } from "express";
import ReportClaimHandler from "../../application/handlers/ReportClaimHandler";
import Claim from "domain/entities/claim.entity";

class ReportClaimAction{
    
    public static async reportDuplicateClaims(claimId1: string, claimId2: string) {
  
      const claim1 = ReportClaimHandler.getClaimById(claimId1);
      const claim2 = ReportClaimHandler.getClaimById(claimId2);
  
      if (claim1 && claim2) {
        
        const ClaimsDuplicate = ReportClaimAction.compareClaimsByContent(claim1, claim2);
  
        if (ClaimsDuplicate) {
          // Implementa la lógica para tomar medidas si los reclamos son duplicados
          // Marcar uno de los reclamos como duplicado en tu base de datos
          ReportClaimHandler.markClaimAsDuplicate(claim1);
        }
  
        return ClaimsDuplicate;
      }
  
      return false; // No se pudieron encontrar los reclamos
    }
  
    private static compareClaimsByContent(claim1: Claim, claim2: Claim): boolean {
      // Implementa la lógica para comparar los reclamos por el campo "contenido"
      return claim1.content === claim2.content;//agregue content en Claim.entity
    }
  }export default new ReportClaimAction();
  
  
  
  
  

    


