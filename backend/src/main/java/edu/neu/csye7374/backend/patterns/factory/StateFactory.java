package edu.neu.csye7374.backend.patterns.factory;

import edu.neu.csye7374.backend.patterns.state.DeliveredState;
import edu.neu.csye7374.backend.patterns.state.OrderState;
import edu.neu.csye7374.backend.patterns.state.ProcessingState;
import edu.neu.csye7374.backend.patterns.state.ShippedState;

public class StateFactory {
    public static OrderState getState(String stateType) {
        switch (stateType) {
            case "processing":
                return new ProcessingState();
            case "shipped":
                return new ShippedState();
            case "delivered":
                return new DeliveredState();
            default:
                return new ProcessingState();
        }
    }
}

