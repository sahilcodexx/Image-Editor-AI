import { useAuth } from "@clerk/nextjs";
type planAccess = {
  resize: true;
  crop: true;
  adjust: false;
  text: true;
  background: false;
  ai_extender: true;
  ai_edit: false;
};

export function usePlanAccess() {
  const { has } = useAuth();

  const isPro = has?.({ plan: "pro" }) || false;
  const isFree = !isPro;

  const planAccess = {
    //this is free tool access
    resize: true,
    crop: true,
    adjust: true,
    text: true,

    //this is pro tool access
    background: isPro,
    ai_extender: isPro,
    ai_edit: isPro,
  };

  //Helper fn to user has access to specific tool
  const hasAccess = (toolID: keyof planAccess) => {
    return planAccess[toolID] === true;
  };

  const getRestrictedTools = () => {
    return Object.entries(planAccess)
      .filter(([_, hasAccess]) => !hasAccess)
      .map(([tooId]) => tooId);
  };

  
}
